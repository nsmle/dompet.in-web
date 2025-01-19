"use client";

import { createContext, ReactElement, ReactNode, useContext, useState } from "react";
import { SignIn } from "@app/api/auth/sign-in/route";
import { SignUp } from "@app/api/auth/sign-up/route";
import { Api } from "@lib/api";
import { SessionType } from "@lib/dal";
import { SignInFormData } from "@lib/definitions/signin.definition";
import { SignUpFormData } from "@lib/definitions/signup.definition";

type AuthProviderProps = { children: ReactNode } & SessionType;
type AuthContextType = SessionType & {
	signIn: ((data: SignInFormData) => Promise<SignIn>) | null;
	signUp: ((data: SignUpFormData) => Promise<SignUp>) | null;
};

const initialValue: AuthContextType = {
	isAuthenticate: false,
	user: null,
	signIn: null,
	signUp: null,
};

const AuthContext = createContext<AuthContextType>(initialValue);

export const AuthProvider = (props: AuthProviderProps): ReactElement => {
	const [isAuthenticate, setIsAuthenticate] = useState<AuthContextType["isAuthenticate"]>(props.isAuthenticate || initialValue.isAuthenticate);
	const [user, setUser] = useState<AuthContextType["user"]>(props.user || initialValue.user);

	const signUp = (data: SignUpFormData): Promise<SignUp> => Api.signUp(data);
	const signIn = async (data: SignInFormData): Promise<SignIn> => {
		const signIn = await Api.signIn(data);
		if (signIn.ok && signIn.data?.user) {
			setIsAuthenticate(true);
			setUser(signIn.data.user);
		}
		return signIn;
	};

	return <AuthContext.Provider value={{ isAuthenticate, user, signIn, signUp }}>{props.children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
