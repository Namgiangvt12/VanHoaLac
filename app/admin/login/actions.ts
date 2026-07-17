'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAction(prevState: any, formData: FormData) {
  const username = formData.get('username')
  const password = formData.get('password')

  if (username === 'admin' && password === 'admin123') {
    const cookieStore = await cookies()
    cookieStore.set('admin_session', 'authenticated', { secure: process.env.NODE_ENV === 'production', httpOnly: true, path: '/' })
    redirect('/admin')
  } else {
    return { error: 'Tài khoản hoặc mật khẩu không chính xác' }
  }
}
