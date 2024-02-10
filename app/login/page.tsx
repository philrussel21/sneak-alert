import Link from 'next/link';
import {headers} from 'next/headers';
import {createClient} from '@app/utils/supabase/server';
import {redirect} from 'next/navigation';

type LoginPageProperties = {
	searchParams: {
		message: string;
	};
};

const signIn = async (formData: FormData): Promise<never> => {
	'use server';

	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const supabase = createClient();

	const {error} = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return redirect('/login?message=Could not authenticate user');
	}

	return redirect('/');
};

const signUp = async (formData: FormData): Promise<never> => {
	'use server';

	const origin = headers().get('origin') ?? '';
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const supabase = createClient();

	const {error} = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${origin}/auth/callback`,
		},
	});

	if (error) {
		return redirect('/login?message=Could not authenticate user');
	}

	return redirect('/login?message=Check email to continue sign in process');
};

const LoginPage = ({searchParams}: LoginPageProperties): JSX.Element => {
	return (
		<div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
			<Link
				href="/"
				className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
				>
					<polyline points="15 18 9 12 15 6"/>
				</svg>
				{' '}
				Back
			</Link>
			<form
				className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
				action={signIn}
			>
				<label className="text-md" htmlFor="email">
					Email
				</label>
				<input
					required
					className="rounded-md px-4 py-2 bg-inherit border mb-6"
					name="email"
					placeholder="you@example.com"
				/>
				<label className="text-md" htmlFor="password">
					Password
				</label>
				<input
					required
					className="rounded-md px-4 py-2 bg-inherit border mb-6"
					type="password"
					name="password"
					placeholder="••••••••"
				/>
				<button type="button" className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
					Sign In
				</button>
				<button
					type="button"
					formAction={signUp}
					className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
				>
					Sign Up
				</button>
				{searchParams.message && (
					<p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
						{searchParams.message}
					</p>
				)}
			</form>
		</div>
	);
};

export default LoginPage;
