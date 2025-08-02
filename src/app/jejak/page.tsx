"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MessageCircle, Share2, MoreHorizontal, Bookmark, Send } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';

type FarmingUpdate = {
  id: string;
  judul: string;
  deskripsi: string;
  fotoUrl: string[];
  createdAt: Date;
  proyekTani: {
    id: string;
    namaProyek: string;
    petani: {
      id: string;
      name: string;
      username: string;
      image: string | null;
    };
  };
  _count: {
    likes: number;
    comments: number;
  };
  likes: {
    userId: string;
  }[];
};

type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    username: string;
  };
};

export default function JejakTaniFeed() {
  const { data: session } = useSession();
  const [updates, setUpdates] = useState<FarmingUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentingOn, setCommentingOn] = useState<string | null>(null);
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [loadingComments, setLoadingComments] = useState<Record<string, boolean>>({});
  const [liking, setLiking] = useState<Record<string, boolean>>({});

  // Fetch farming updates
  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await fetch('/api/farming-updatee');
        const data = await response.json();
        setUpdates(data);
      } catch (error) {
        console.error('Error fetching updates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  // Toggle like on a farming update
  const toggleLike = async (farmingUpdateId: string) => {
    if (!session) return;

    setLiking(prev => ({ ...prev, [farmingUpdateId]: true }));

    try {
      const update = updates.find(u => u.id === farmingUpdateId);
      const isLiked = update?.likes?.some(like => like.userId === session.user.id);

      if (isLiked) {
        await fetch('/api/like', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: session.user.id,
            farmingUpdateId,
          }),
        });

        setUpdates(prev =>
          prev.map(update => {
            if (update.id === farmingUpdateId) {
              return {
                ...update,
                _count: {
                  ...update._count,
                  likes: update._count.likes - 1,
                },
                likes: update.likes.filter(like => like.userId !== session.user.id),
              };
            }
            return update;
          })
        );
      } else {
        await fetch('/api/like', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: session.user.id,
            farmingUpdateId,
          }),
        });

        setUpdates(prev =>
          prev.map(update => {
            if (update.id === farmingUpdateId) {
              return {
                ...update,
                _count: {
                  ...update._count,
                  likes: update._count.likes + 1,
                },
                likes: [...(Array.isArray(update.likes) ? update.likes : []), { userId: session.user.id }],
              };
            }
            return update;
          })
        );
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setLiking(prev => ({ ...prev, [farmingUpdateId]: false }));
    }
  };

  // Load comments for a farming update
  const loadComments = async (farmingUpdateId: string) => {
    if (comments[farmingUpdateId]) return;

    setLoadingComments(prev => ({ ...prev, [farmingUpdateId]: true }));

    try {
      const response = await fetch(`/api/comment/${farmingUpdateId}`);
      const data = await response.json();
      setComments(prev => ({ ...prev, [farmingUpdateId]: data }));
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoadingComments(prev => ({ ...prev, [farmingUpdateId]: false }));
    }
  };

  // Submit a comment
  const submitComment = async (farmingUpdateId: string) => {
    if (!session || !commentContent.trim()) return;

    try {
      const response = await fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: commentContent,
          farmingUpdateId,
        }),
      });

      if (response.ok) {
        const newComment = await response.json();
        setComments(prev => ({
          ...prev,
          [farmingUpdateId]: [newComment, ...(prev[farmingUpdateId] || [])],
        }));

        // Update comment count
        setUpdates(prev =>
          prev.map(update => {
            if (update.id === farmingUpdateId) {
              return {
                ...update,
                _count: {
                  ...update._count,
                  comments: update._count.comments + 1,
                },
              };
            }
            return update;
          })
        );

        setCommentContent('');
        setCommentingOn(null);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleShare = (title: string, url: string, text: string) => {
    if (navigator.share) {
      navigator.share({
        title: `Lihat update ${title} di Tandur`,
        text: `Lihat projek ${text} di Tandur`,
        url: `/proyek/${url}`,
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link produk telah disalin ke clipboard');
      });
    }
  };


  // Format date to relative time (e.g., "2 hours ago")
  const formatDate = (date: Date) => {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: id,
    });
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-6 px-4 space-y-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="grid grid-cols-2 gap-2">
              <Skeleton className="h-48 w-full rounded" />
              <Skeleton className="h-48 w-full rounded" />
            </div>
            <div className="flex space-x-4 pt-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-6">
      <h1 className="text-2xl font-bold text-green-800">Jejak Tani</h1>
      <p className="text-gray-600">
        Ikuti perkembangan terbaru dari proyek-proyek pertanian di sekitar Anda
      </p>

      {updates.length === 0 && !loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Belum ada jejak tani yang tersedia</p>
        </div>
      ) : (
        updates.map(update => (
          <div key={update.id} className="border rounded-lg overflow-hidden shadow-sm">
            {/* Header with farmer info */}
            <div className="flex items-center justify-between p-4">
              <Link
                href={`/petani/${update.proyekTani.petani.username}`}
                className="flex items-center space-x-3 group"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={update.proyekTani.petani.image || undefined}
                    alt={update.proyekTani.petani.name}
                  />
                  <AvatarFallback>
                    {update.proyekTani.petani.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium group-hover:text-green-600 transition-colors">
                    {update.proyekTani.petani.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(update.createdAt)}
                  </p>
                </div>
              </Link>
              <button className="text-gray-500 hover:text-gray-700 p-1">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>

            {/* Project link */}
            <Link
              href={`/proyek/${update.proyekTani.id}`}
              className="px-4 pb-2 block hover:underline text-sm font-medium text-green-700"
            >
              {update.proyekTani.namaProyek}
            </Link>

            {/* Update content */}
            <div className="px-4 pb-3">
              <p className="whitespace-pre-line">{update.deskripsi}</p>
            </div>

            {/* Images */}
            {update.fotoUrl && update.fotoUrl.length > 0 && (
              <div className="border-y">
                <div
                  className={`grid gap-0.5 ${
                    update.fotoUrl.length === 1
                      ? 'grid-cols-1'
                      : 'grid-cols-2'
                  }`}
                >
                  {update.fotoUrl.map((image, idx) => (
                    <div
                      key={idx}
                      className="aspect-square bg-gray-100 relative overflow-hidden"
                    >
                      <Image
                        src={image}
                        alt={`Update image ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="px-4 py-2 flex justify-between border-b">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => toggleLike(update.id)}
                  disabled={liking[update.id]}
                  className={`flex items-center space-x-1 ${
                    update.likes?.some(like => like.userId === session?.user.id)
                      ? 'text-red-500'
                      : 'text-gray-500 hover:text-red-500'
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      update.likes?.some(like => like.userId === session?.user.id)
                        ? 'fill-current'
                        : ''
                    }`}
                  />
                  <span>{update._count.likes}</span>
                </button>
                <button
                  onClick={() => {
                    setCommentingOn(commentingOn === update.id ? null : update.id);
                    if (commentingOn !== update.id) {
                      loadComments(update.id);
                    }
                  }}
                  className="flex items-center space-x-1 text-gray-500 hover:text-green-600"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>{update._count.comments}</span>
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleShare(update.judul, update.proyekTani.id, update.proyekTani.namaProyek)}
                 className="text-gray-500 hover:text-green-600">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Comment section */}
            {commentingOn === update.id && (
              <div className="bg-gray-50 p-4 space-y-3">
                {/* Comment form */}
                {session && (
                  <div className="flex space-x-2">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={session.user.image || undefined}
                        alt={session.user.name || 'User'}
                      />
                      <AvatarFallback>
                        {session.user.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex space-x-2">
                      <Textarea
                        value={commentContent}
                        onChange={e => setCommentContent(e.target.value)}
                        placeholder="Tulis komentar..."
                        className="flex-1 min-h-[40px]"
                        rows={1}
                      />
                      <Button
                        onClick={() => submitComment(update.id)}
                        size="sm"
                        className="self-end"
                        disabled={!commentContent.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Comments list */}
                {loadingComments[update.id] ? (
                  <div className="space-y-4">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="flex space-x-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="flex-1 space-y-1">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-3 w-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  comments[update.id]?.map(comment => (
                    <div key={comment.id} className="flex space-x-2">
                      <Link
                        href={`/petani/${comment.user.username}`}
                        className="flex-shrink-0"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {comment.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="bg-white p-2 rounded-lg flex-1">
                        <div className="flex items-baseline space-x-2">
                          <Link
                            href={`/petani/${comment.user.username}`}
                            className="text-sm font-medium hover:underline"
                          >
                            {comment.user.name}
                          </Link>
                          <span className="text-xs text-gray-500">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm mt-1">{comment.content}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}