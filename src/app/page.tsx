import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function Home() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken');

  if (refreshToken?.value) {
    redirect('/i');
  } else {
    redirect('/auth/welcome');
  }


}