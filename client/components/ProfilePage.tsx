import { useParams } from 'react-router'
import { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {
  useUserProfile,
  useUserPosts,
  useFollowers,
  useFollowing,
} from '../hooks/useProfile.js'
import FollowListModal from './FollowListModal'
import Post from './Post'

function ProfilePage() {
  const { authId } = useParams<{ authId: string }>()

  const {
    data: userProfile,
    isLoading: isProfileLoading,
    isError: isProfileError,
    error: profileError,
  } = useUserProfile(authId || '')

  const {
    data: userPosts,
    isLoading: isPostsLoading,
    isError: isPostsError,
    error: postsError,
  } = useUserPosts(authId || '')

  const {
    data: followers,
    isLoading: isFollowersLoading,
    isError: isFollowersError,
    error: followersError,
  } = useFollowers(authId || '')

  const {
    data: following,
    isLoading: isFollowingLoading,
    isError: isFollowingError,
    error: followingError,
  } = useFollowing(authId || '')

  const [modalView, setModalView] = useState<'followers' | 'following' | null>(
    null,
  )

  if (!authId) {
    return <p className="text-red-500">Error: User ID not provided in URL.</p>
  }

  if (
    isProfileLoading ||
    isPostsLoading ||
    isFollowersLoading ||
    isFollowingLoading
  ) {
    return <p className="text-center text-gray-500">Loading profile...</p>
  }

  const errorStates = [
    { isError: isProfileError, error: profileError, label: 'profile' },
    { isError: isPostsError, error: postsError, label: 'posts' },
    { isError: isFollowersError, error: followersError, label: 'followers' },
    {
      isError: isFollowingError,
      error: followingError,
      label: 'following list',
    },
  ]

  const firstError = errorStates.find((s) => s.isError)

  if (firstError) {
    return (
      <p className="text-red-500">
        Error loading {firstError.label}:{' '}
        {firstError.error instanceof Error
          ? firstError.error.message
          : 'Unknown error'}
      </p>
    )
  }

  if (!userProfile) {
    return <p className="text-red-500">User profile not found.</p>
  }

  return (
    <div className="container mx-auto p-4">
      {/* Profile Header */}
      <div className="mb-6 flex items-center space-x-4 rounded-lg bg-gray-800 p-4 shadow-md">
        <img
          src={userProfile.profile_picture || 'https://via.placeholder.com/150'}
          alt={`${userProfile.name}'s profile`}
          className="h-24 w-24 rounded-full border-4 border-purple-500 object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold text-white">{userProfile.name}</h1>
          <p className="italic text-gray-300">
            {userProfile.bio || 'No bio provided.'}
          </p>
          {/* Post, Followers, and Following Interactions */}
          <div className="mt-2 flex space-x-4">
            {/* <span className="text-gray-400">
              <strong className="text-white">{userPosts?.length || 0}</strong>{' '}
              Posts
            </span> */}
            {/* Clickable icon (as a button) for Followers */}
            <button
              className="flex items-center space-x-1 text-white hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              onClick={() => setModalView('followers')}
              aria-label="View Followers"
            >
              <i className="bi bi-people text-2xl"></i>
            </button>
            {/* Clickable icon (as a button) for Following */}
            <button
              className="flex items-center space-x-1 text-white hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              onClick={() => setModalView('following')}
              aria-label="View Following"
            >
              <i className="bi bi-person-check text-2xl"></i>
            </button>
          </div>
        </div>
      </div>

      {/* User Posts Section */}
      <h2 className="mb-4 text-2xl font-semibold text-white">Posts</h2>
      {userPosts && userPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {userPosts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No posts yet.</p>
      )}

      {/* Follower List Modal */}
      {followers && (
        <FollowListModal
          isOpen={modalView === 'followers'}
          onClose={() => setModalView(null)}
          title="Followers"
          users={followers}
        />
      )}

      {/* Following List Modal */}
      {following && (
        <FollowListModal
          isOpen={modalView === 'following'}
          onClose={() => setModalView(null)}
          title="Following"
          users={following}
        />
      )}
    </div>
  )
}

export default ProfilePage
