'use server'

import * as bcypt from 'bcryptjs'
import { prisma } from "../prisma";
import { registerSchema } from "../validations/user"
import { signIn } from '@/auth';
import { redirect } from 'next/navigation';
import { ZodError } from 'zod';

type ActionState = {
    success: boolean,
    errors: Record<string, string[]>
}

//  バリデーションエラー処理
function handleValidationError(error: ZodError): ActionState {
const { fieldErrors, formErrors } = error.flatten();
const castedFieldErrors = fieldErrors as Record<string, string[]>;
// zodの仕様でパスワード一致確認のエラーは formErrorsで渡ってくる
// formErrorsがある場合は、confirmPasswordフィールドにエラーを追加
if (formErrors.length > 0) {
    return { success: false, errors: { ...fieldErrors, confirmPassword: formErrors
    }}}
    return { success: false, errors: castedFieldErrors };
}
// カスタムエラー処理
function handleError(customErrors: Record<string, string[]>): ActionState {
    return { success: false, errors: customErrors };
}

export async function createUser(prvActions: ActionState,formData: FormData):Promise< ActionState> {
    // フォームからの情報を取得
    const rowFormData = Object.fromEntries(
        ["name", "email", "password", "confirmPassword"].map(field => [
            field,
            formData.get(field) as string
        ])
    ) as Record<string, string>
    // バリデーション
    const validationResult = registerSchema.safeParse(rowFormData);
    if(!validationResult.success) {
        return handleValidationError(validationResult.error)
    }

    // DBメール確認
    const existsUser = await prisma.user.findUnique({
        where: { email: rowFormData.email }
    })

    if(existsUser) {
        return handleError({ email: ['このメールアドレスはすでに登録されています。'] });
    }

    // DB登録
    const hasPass = await bcypt.hash(rowFormData.password, 12);

    await prisma.user.create({
        data: {
            name: rowFormData.name,
            email: rowFormData.email,
            password: hasPass
        }
    })
    // リダイレクト
    await signIn('credentials', {
        ...Object.fromEntries(formData),
        redirect: false
    });

    redirect('/dashboard');
}