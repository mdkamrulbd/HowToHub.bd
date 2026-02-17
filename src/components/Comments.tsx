'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { MessageSquare, Send, User, Reply, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal'
import { deleteComment } from '@/app/actions/comments'

interface Comment {
  id: string
  name: string
  email?: string | null
  content: string
  created_at: string
  parent_id?: string | null
  is_admin_reply?: boolean
}

function CommentForm({
  parentId,
  isReply = false,
  name,
  email,
  content,
  error,
  isSubmitting,
  onSubmit,
  onCancelReply,
  setName,
  setEmail,
  setContent,
}: {
  parentId?: string
  isReply?: boolean
  name: string
  email: string
  content: string
  error: string | null
  isSubmitting: boolean
  onSubmit: (e: React.FormEvent) => void
  onCancelReply?: () => void
  setName: React.Dispatch<React.SetStateAction<string>>
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setContent: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <form onSubmit={onSubmit} className={`space-y-4 ${isReply ? 'mt-4 ml-8' : ''}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`name-${parentId || 'root'}`} className="block text-sm font-medium text-slate-300 mb-1">
            আপনার নাম
          </label>
          <input
            type="text"
            id={`name-${parentId || 'root'}`}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            placeholder="নাম লিখুন"
          />
        </div>
        <div>
          <label htmlFor={`email-${parentId || 'root'}`} className="block text-sm font-medium text-slate-300 mb-1">
            ইমেইল (প্রকাশিত হবে না)
          </label>
          <input
            type="email"
            id={`email-${parentId || 'root'}`}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            placeholder="example@email.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor={`content-${parentId || 'root'}`} className="block text-sm font-medium text-slate-300 mb-1">
          আপনার মন্তব্য
        </label>
        <textarea
          id={`content-${parentId || 'root'}`}
          required
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
          placeholder="এখানে লিখুন..."
        />
      </div>

      {error && (
        <div className="text-red-400 text-sm bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-2">
        {isReply && (
          <button
            type="button"
            onClick={onCancelReply}
            className="px-4 py-2 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 text-sm font-medium transition"
          >
            বাতিল
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 hover:shadow-indigo-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              পাঠানো হচ্ছে...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {isReply ? 'রিপ্লাই দিন' : 'মন্তব্য করুন'}
            </>
          )}
        </button>
      </div>
    </form>
  )
}

export default function Comments({ postId, initialComments }: { postId: string, initialComments: Comment[] }) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [savedEmail, setSavedEmail] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const loadUserState = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      const admin = user?.user_metadata?.role === 'admin' || user?.user_metadata?.role === 'manager'
      setIsAdmin(!!admin)
      const stored = window.localStorage.getItem('comment_email')
      setSavedEmail(stored)
    }
    loadUserState()
  }, [])

  const handleSubmit = async (e: React.FormEvent, parentId?: string) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        throw new Error('সঠিক ইমেইল ঠিকানা দিন।')
      }

      const supabase = createClient()
      // Check if user is admin
      const { data: { user } } = await supabase.auth.getUser()
      const isAdmin = user?.user_metadata?.role === 'admin' || user?.user_metadata?.role === 'manager'

      // Sanitize content before sending (basic client-side check)
      const sanitizedContent = content.replace(/<[^>]*>?/gm, '')
      
      const { data, error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          parent_id: parentId || null,
          name: isAdmin ? 'Admin' : name,
          email,
          content: sanitizedContent,
          is_approved: true,
          is_admin_reply: isAdmin
        })
        .select()
        .single()

      if (error) throw error

      setComments((prev) => [data, ...prev])
      window.localStorage.setItem('comment_email', email)
      setSavedEmail(email)
      setName('')
      setEmail('')
      setContent('')
      setReplyingTo(null)
      router.refresh()
    } catch (err: unknown) {
      console.error('Error adding comment:', err)
      const message =
        err instanceof Error ? err.message : 'মন্তব্য যোগ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const canDelete = (comment: Comment) => {
    if (isAdmin) return true
    if (!savedEmail || !comment.email) return false
    return savedEmail.trim().toLowerCase() === comment.email.trim().toLowerCase()
  }

  const handleDelete = async () => {
    if (!deleteId) return
    setIsDeleting(true)
    setError(null)
    try {
      await deleteComment(deleteId, isAdmin ? null : savedEmail)
      setComments((prev) => prev.filter((c) => c.id !== deleteId && c.parent_id !== deleteId))
      setDeleteId(null)
      router.refresh()
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'মন্তব্য ডিলিট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।'
      setError(message)
    } finally {
      setIsDeleting(false)
    }
  }

  const DateText = ({ iso }: { iso: string }) => {
    const [text, setText] = useState('')
    useEffect(() => {
      const d = new Date(iso)
      setText(
        d.toLocaleDateString('bn-BD', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      )
    }, [iso])
    return <span suppressHydrationWarning className="text-xs text-slate-400 whitespace-nowrap">{text}</span>
  }

  const rootComments = comments.filter((c) => !c.parent_id)
  const replies = comments.filter((c) => c.parent_id)

  return (
    <div className="mt-12 space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="h-6 w-6 text-indigo-400" />
        <h3 className="text-xl font-bold text-white">মন্তব্য করুন ({comments.length})</h3>
      </div>

      {/* Main Comment Form */}
      <div className="surface rounded-2xl p-6 border border-white/10 bg-slate-900/50">
        <CommentForm
          name={name}
          email={email}
          content={content}
          error={error}
          isSubmitting={isSubmitting}
          onSubmit={(e) => handleSubmit(e)}
          setName={setName}
          setEmail={setEmail}
          setContent={setContent}
        />
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {rootComments.length > 0 ? (
          rootComments.map((comment) => (
            <div key={comment.id} className="surface rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center border ${
                  comment.is_admin_reply 
                    ? 'bg-indigo-500/20 border-indigo-500/30' 
                    : 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-white/10'
                }`}>
                  <User className={`h-5 w-5 ${comment.is_admin_reply ? 'text-indigo-300' : 'text-slate-300'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-sm font-semibold truncate ${comment.is_admin_reply ? 'text-indigo-300' : 'text-white'}`}>
                        {comment.name}
                        {comment.is_admin_reply && <span className="ml-2 text-[10px] bg-indigo-500/20 px-1.5 py-0.5 rounded border border-indigo-500/30">ADMIN</span>}
                      </h4>
                    </div>
                    <div className="flex items-center gap-3">
                      <DateText iso={comment.created_at} />
                      {canDelete(comment) && (
                        <button
                          onClick={() => setDeleteId(comment.id)}
                          className="inline-flex items-center gap-1 text-[11px] text-rose-300 hover:text-rose-200 transition-colors"
                        >
                          <Trash2 className="h-3 w-3" />
                          ডিলিট
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed break-words">
                    {comment.content}
                  </p>
                  
                  <button 
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className="mt-3 flex items-center gap-1 text-xs text-slate-400 hover:text-indigo-300 transition-colors"
                  >
                    <Reply className="h-3 w-3" />
                    রিপ্লাই
                  </button>

                  {/* Reply Form */}
                  {replyingTo === comment.id && (
                    <CommentForm
                      parentId={comment.id}
                      isReply={true}
                      name={name}
                      email={email}
                      content={content}
                      error={error}
                      isSubmitting={isSubmitting}
                      onSubmit={(e) => handleSubmit(e, comment.id)}
                      onCancelReply={() => setReplyingTo(null)}
                      setName={setName}
                      setEmail={setEmail}
                      setContent={setContent}
                    />
                  )}

                  {/* Nested Replies */}
                  {replies.filter(r => r.parent_id === comment.id).map(reply => (
                    <div key={reply.id} className="mt-4 ml-4 sm:ml-8 pl-4 border-l-2 border-white/10">
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center border ${
                          reply.is_admin_reply 
                            ? 'bg-indigo-500/20 border-indigo-500/30' 
                            : 'bg-white/5 border-white/10'
                        }`}>
                          <User className={`h-4 w-4 ${reply.is_admin_reply ? 'text-indigo-300' : 'text-slate-400'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <div className="flex items-center gap-2">
                              <h4 className={`text-xs font-semibold truncate ${reply.is_admin_reply ? 'text-indigo-300' : 'text-slate-200'}`}>
                                {reply.name}
                                {reply.is_admin_reply && <span className="ml-2 text-[10px] bg-indigo-500/20 px-1.5 py-0.5 rounded border border-indigo-500/30">ADMIN</span>}
                              </h4>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] text-slate-500 whitespace-nowrap">
                                <DateText iso={reply.created_at} />
                              </span>
                              {canDelete(reply) && (
                                <button
                                  onClick={() => setDeleteId(reply.id)}
                                  className="inline-flex items-center gap-1 text-[10px] text-rose-300 hover:text-rose-200 transition-colors"
                                >
                                  <Trash2 className="h-3 w-3" />
                                  ডিলিট
                                </button>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-slate-300 leading-relaxed break-words">
                            {reply.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-400 bg-white/5 rounded-2xl border border-dashed border-white/10">
            এখনো কোনো মন্তব্য নেই। আপনিই প্রথম মন্তব্য করুন!
          </div>
        )}
      </div>
      <DeleteConfirmationModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="কমেন্ট ডিলিট"
        message="আপনি কি নিশ্চিত যে এই মন্তব্যটি ডিলিট করতে চান?"
        isDeleting={isDeleting}
      />
    </div>
  )
}
