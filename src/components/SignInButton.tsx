'use client';
import { Link } from '@chakra-ui/next-js';
import { Container } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React from 'react';

export const SignInButton = () => {
  const { data: session } = useSession();
  console.log(session);

  if (session && session.user)
    return (
      <>
        <Container backgroundColor={'gray.200'}>
          <p color='black'>{session?.user?.name}</p>
          <Link href={'/api/auth/signout'} color={'green.400'}>
            Sign Out
          </Link>
        </Container>
      </>
    );

  return (
    <Container backgroundColor={'gray.200'}>
      <Link href={'/api/auth/signin'} color={'red.400'}>
        Sign in
      </Link>
      <Link href={'/signup'} color={'green.400'}>
        Sign up
      </Link>
    </Container>
  );
};
