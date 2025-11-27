import { useAuth0 } from '@auth0/auth0-react'
import { createUser, getUserById } from '../apis/users'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { UserData } from '../../models/user'

function LoginPage() {
  const emptyFormState = {
    name: '',
    bio: '',
    font: '',
    profilePicture: '',
  } as UserData
  const queryClient = useQueryClient()
  const { loginWithRedirect, isAuthenticated } = useAuth0()
  const navigate = useNavigate()
  const [formState, setFormState] = useState<UserData>(emptyFormState)

  const createMutation = useMutation({
    mutationFn: (user: UserData) => createUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })

  // const {
  //   data: user,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ['user'],
  //   queryFn: () => getUserById(),
  //   enabled: isAuthenticated,
  // })

  const user = undefined // TODO: replace with actual user data when available

  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
    }))
  })

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/layout')
    }
  }, [user, isAuthenticated, navigate])

  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  // if (isError) {
  //   return <div>Error loading user data</div>
  // }

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault()
    try {
      await createMutation.mutateAsync(formState)
      navigate('/app')
    } catch (error) {
      console.error('Failed to Update Profile:', error)
    }
  }

  const handleLogin = async () => {
    const redirectUri = `${window.location.origin}`
    await loginWithRedirect({
      authorizationParams: { redirect_uri: redirectUri, prompt: 'login' },
    })
  }

  return (
    <div>
      <IfNotAuthenticated>
        <h1>Login Page</h1>
        <button onClick={handleLogin}>Log In</button>
      </IfNotAuthenticated>
      <IfAuthenticated>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="Name">
              Name:
              <input
                type="text"
                id="name"
                name="name"
                placeholder="User Name"
                value={formState.name}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="Bio">
              Bio:
              <input
                name="bio"
                type="text"
                id="bio"
                placeholder="Bio"
                value={formState.bio}
                onChange={handleChange}
              ></input>
            </label>
            {/* Also profile picture */}
          </div>
          <button type="submit">Create Profile</button>
        </form>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <p>Please log in to view and edit your profile.</p>
      </IfNotAuthenticated>
    </div>
  )
}

export default LoginPage
