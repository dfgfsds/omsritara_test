"use client";
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader } from 'lucide-react';
import axios from 'axios';
import url from '@/api-endpoints/ApiUrls'
import { getCartApi } from '@/api-endpoints/CartsApi';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useVendor } from '@/context/VendorContext';
import { useAuthRedirect } from '@/context/useAuthRedirect';
import LoginModal from '../LoginModal/page';
// import { useAuthRedirect } from '@/components/useAuthRedirect';
interface FormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [error, setError] = useState('');
  const { vendorId } = useVendor();
  const router = useRouter();
  const [passwordShow, setPasswordShow] = useState(false);
  const [loading, setLoading] = useState(false);
  useAuthRedirect({ redirectIfAuthenticated: true });

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    //   logEvent(analytics, 'login', {
    //     method: 'email_password', 
    //     email:data?.email,
    //   });
    try {
      const response: any = await axios.post(url.signIn,
        {
          ...data, vendor_id: vendorId
        })
      if (response) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('userId', response?.data?.user_id)
          const updateApi = await getCartApi(`user/${response?.data?.user_id}`);
          if (updateApi) {
            localStorage.setItem('cartId', updateApi?.data[0]?.id);
            // localStorage.setItem('reloadOnceAfterProfile', 'true');
            router.push('/shop');
            setLoading(false);
            window.location.reload();
          }
        }
      }
    } catch (err: any) {
      setLoading(false);
      setError(err?.response?.data?.error || ' Something went wrong, please try again later.');
    }
  };
  const [signInmodal, setSignInModal] = useState<boolean>(true);

  return (
    <>

      {signInmodal && (
        <LoginModal open={signInmodal} handleClose={() => router.back()} vendorId={vendorId} />
      )}
    </>
  );
}