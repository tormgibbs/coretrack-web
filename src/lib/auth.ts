export const checkAuth = async () => {
	const isAuthenticated = Boolean(localStorage.getItem('userToken'))
	return {
		isAuthenticated,
	}
}
