'use server';

import { z } from "zod";

interface FormState {
  success: boolean;
  error?: string;
};


const checkEmailDomain = (email: string) => email.includes("@zod.com")
const checkPasswordPattern = /^(?=.*\d).+$/;

const formSchema = z.object({
  email: z.string().email().toLowerCase().refine(checkEmailDomain, "@zod.com 도메인이 아닙니다"),
  username: z.string().toLowerCase().min(5, "사용자 이름은 5글자 이상이어야 합니다."),
  password: z.string().regex(checkPasswordPattern, "패스워드는 최소 하나 이상의 숫자를 포함해야 합니다").refine((password)=> password === '12345', "패스워드가 맞지 않습니다")
})

export async function onLoginAction(
    _prevState: FormState,
    formData: FormData
): Promise<any> {
  const data = {
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password')
  }
  
  const result = formSchema.safeParse(data)
  if (!result.success) {
    return result.error.flatten();
  } else {
    return result.data
  }
}
  
  // if (password === '12345') {
  //   return { success: true };
  // }

  // return { success: false, error: 'Incorrect password. Please try again.' };
