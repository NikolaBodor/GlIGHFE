import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaOptionsType } from 'embla-carousel'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type PropType = {
  textBoxes: string[]
  options?: EmblaOptionsType
}

const EmblaCarousel = (props: PropType) => {
  const { textBoxes = [], options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
    axis: 'x',
    dragFree: false,
  })
  const [currentIndex, setCurrentIndex] = useState(0)
  const navigate = useNavigate()

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCurrentIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  const isLastSlide = currentIndex === textBoxes.length - 1

  return (
    <section className="w-full px-8">
      <div className="touch-pan-y overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {textBoxes.map((text, index) => (
            <div
              className="flex min-w-0 flex-[0_0_100%] items-center justify-center py-8"
              key={index}
            >
              <div className="text-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {!isLastSlide && <p className="mt-4 text-center text-5xl">➽➽➽</p>}
      {isLastSlide && (
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              navigate('/feed')
            }}
            className="hover:bg-success-strong focus:ring-success-medium shadow-xs text-md rounded-xl border-2 border-black bg-lime-400 px-4 py-2.5 font-bold leading-5 focus:outline-none focus:ring-4"
          >
            I AGREE I WILL USE NO TEXT
          </button>
        </div>
      )}
    </section>
  )
}

export default EmblaCarousel
