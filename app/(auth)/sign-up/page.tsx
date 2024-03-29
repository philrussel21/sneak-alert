import Link from 'next/link';
import {Button, Container, Region} from '@app/components';
import {signUp} from '@app/utils/actions/auth';
import routes from '@app/config/routes';

type SignUpPageProperties = {
	searchParams: {
		message: string;
	};
};

const SignUpPage = ({searchParams}: SignUpPageProperties): JSX.Element => {
	return (
		<Region>
			<Container className="flex-1 flex flex-col w-full p-8 sm:max-w-md mx-auto justify-center gap-2 bg-white shadow-2xl rounded-2xl">
				<Link
					href="/"
					className="py-2 rounded-md no-underline flex items-center group text-sm"
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
					Back to Home
				</Link>
				<form
					className="animate-in flex-1 flex flex-col w-full justify-center gap-"
					action={signUp}
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
					<Button.Semantic type="submit" label="Sign Up" className="bg-green-500"/>
					<p className="text-sm mt-4">
						Already have an account?
						{' '}
						<Link href={routes.login} className="underline hover:no-underline">Log in</Link>
						{' '}
						instead
					</p>
					{searchParams.message && (
						<p className="mt-4 p-4 text-center">
							{searchParams.message}
						</p>
					)}
				</form>
			</Container>
		</Region>
	);
};

export default SignUpPage;
