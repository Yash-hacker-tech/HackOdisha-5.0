import React, { useState, useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import { useClubs } from '../hooks/useClubs';
import { Link } from 'react-router-dom';

const PostFeed = () => {
  const { user } = useUser();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, my_clubs, announcements

  useEffect(() => {
    // Mock data - in real implementation, this would come from API
    const mockPosts = [
      {
        id: 1,
        title: 'Welcome to the New Semester!',
        content: 'We are excited to start the new semester with lots of activities and events planned. Stay tuned for more updates!',
        author: 'College Admin',
        club_name: 'College Administration',
        created_at: '2024-01-15T09:00:00Z',
        type: 'announcement',
        likes: 25,
        comments: 8,
        club_id: null
      },
      {
        id: 2,
        title: 'Hackathon Registration Open',
        content: 'The annual coding hackathon is now open for registration. Teams of 2-4 members can register. Prizes worth ₹50,000 to be won!',
        author: 'CS Club Admin',
        club_name: 'Computer Science Club',
        created_at: '2024-01-14T16:30:00Z',
        type: 'event',
        likes: 42,
        comments: 15,
        club_id: 1
      },
      {
        id: 3,
        title: 'Photography Contest Winners',
        content: 'Congratulations to all the winners of our photography contest! The theme was "Campus Life" and we received amazing entries.',
        author: 'Photo Club Admin',
        club_name: 'Photography Club',
        created_at: '2024-01-13T14:20:00Z',
        type: 'announcement',
        likes: 18,
        comments: 5,
        club_id: 2
      },
      {
        id: 4,
        title: 'New Music Club Members Wanted',
        content: 'We are looking for talented musicians to join our club. Whether you play instruments or sing, we welcome all skill levels!',
        author: 'Music Club Admin',
        club_name: 'Music Club',
        created_at: '2024-01-12T11:15:00Z',
        type: 'recruitment',
        likes: 12,
        comments: 22,
        club_id: 3
      }
    ];

    // Filter posts based on user preferences
    let filteredPosts = mockPosts;

    if (filter === 'my_clubs' && user?.role === 'student') {
      // In real implementation, this would filter by clubs the user follows
      filteredPosts = mockPosts.filter(post => post.club_id !== null);
    } else if (filter === 'announcements') {
      filteredPosts = mockPosts.filter(post => post.type === 'announcement');
    }

    setPosts(filteredPosts);
    setLoading(false);
  }, [user, filter]);

  const handleLike = (postId) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const getPostTypeColor = (type) => {
    switch (type) {
      case 'announcement': return 'bg-blue-100 text-blue-800';
      case 'event': return 'bg-green-100 text-green-800';
      case 'recruitment': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading posts...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Posts & Announcements</h1>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6">
          {[
            { key: 'all', label: 'All Posts' },
            { key: 'announcements', label: 'Announcements' },
            { key: 'my_clubs', label: 'My Clubs' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-md ${
                filter === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors duration-200`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Create Post Button for Admins */}
        {(user?.role === 'club_admin' || user?.role === 'college_admin') && (
          <div className="mb-6">
            <Link
              to="/posts/create"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Create New Post
            </Link>
          </div>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No posts found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPostTypeColor(post.type)}`}>
                      {post.type}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">
                    By {post.author} • {post.club_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {post.likes}
                  </button>
                  <div className="flex items-center gap-1 text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {post.comments}
                  </div>
                </div>

                <Link
                  to={`/posts/${post.id}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostFeed;
