export function login(currentAdmin){
	return {
		type: 'LOGIN_SUCCESS',
		payload: currentAdmin
	};
}
