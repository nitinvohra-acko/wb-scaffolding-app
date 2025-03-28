'use server';

import { cookies } from 'next/headers';

const getCookie = async (name: string) => {
  return (await cookies()).get(name)?.value;
};

export default getCookie;
