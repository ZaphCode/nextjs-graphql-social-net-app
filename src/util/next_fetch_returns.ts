export function Redirect(destination: string) {
	return {
		redirect: {
			destination: destination,
			permanent: false,
		},
	};
}

export function ErrorPage(message: string) {
	return {
		props: { error: { statusCode: 500, message: message } },
	};
}

export function SSRProps(props: {}) {
	return {
		props: {...props},
	};
}

export function SSGProps(props: {}, revalidateTime: number) {
	return {
		props: {...props},
        revalidate: revalidateTime
	};
}


