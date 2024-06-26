<template>
	<div class="p-3">
		<p class="title has-text-centered">
			Login
		</p>

		<b-notification :message="loginError" type="is-danger is-light" v-if="loginError" closable />

		<div class="columns is-centered is-mobile">
			<div class="column">
				<b-button expanded @click="googleLogin">
					<b-icon pack="mdi" icon="google" />
				</b-button>
			</div>

			<div class="column">
				<b-button expanded @click="facebookLogin">
					<b-icon pack="mdi" icon="facebook" />
				</b-button>
			</div>

			<div class="column">
				<b-button expanded @click="azureLogin">
					<b-icon pack="mdi" icon="microsoft" />
				</b-button>
			</div>

			<div class="column">
				<b-button expanded @click="twitterLogin">
					<b-icon pack="mdi" icon="twitter" />
				</b-button>
			</div>
		</div>

		<hr>

		<form @submit.prevent="login">

			<b-field label="Email">
				<b-input icon="email" ref="emailInput" type="email" v-model="email" required />
			</b-field>

			<b-field label="Password">
				<b-input icon="lock" ref="passwordInput" type="password" minlength="6" password-reveal v-model="password"
					required />
			</b-field>

			<b-field class="has-text-right">
				<NuxtLink to="/forgot_password">Forgot password?</NuxtLink>
			</b-field>

			<b-field>
				<b-button rounded type="is-primary" @click="onSubmit" :disabled="loggingIn" expanded :loading="loggingIn"
					label="Login" native-type="submit" />
			</b-field>

			<b-field>
				<b-button rounded type="is-link" expanded @click="navigateTo('/register')" label="Create account" />
			</b-field>
		</form>
	</div>
</template>

<script setup>
const client = useSupabaseClient()
const email = ref('')
const password = ref('')
const loginError = ref('')
const loggingIn = ref(false)
const runtimeConfig = useRuntimeConfig()

const login = async () => {
	try {
		loggingIn.value = true
		const { error } = await client.auth.signInWithPassword({
			email: email.value,
			password: password.value
		})
		if (error) {
			throw error
		} else {
			await navigateTo('/confirm')
		}
	} catch (error) {
		loggingIn.value = false
		loginError.value = error.message
	}
}

const googleLogin = async () => {
	try {
		loggingIn.value = true
		const { error } = await client.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${runtimeConfig.public.siteURL}/confirm`
			}
		})
		if (error) {
			throw error
		}
	} catch (error) {
		loginError.value = error.message
	}
}

const twitterLogin = async () => {
	try {
		loggingIn.value = true
		const { error } = await client.auth.signInWithOAuth({
			provider: 'twitter',
			options: {
				redirectTo: `${runtimeConfig.public.siteURL}/confirm`
			}
		})
		if (error) {
			throw error
		}
	} catch (error) {
		loginError.value = error.message
	}
}

const facebookLogin = async () => {
	try {
		loggingIn.value = true
		const { error } = await client.auth.signInWithOAuth({
			provider: 'facebook',
			options: {
				redirectTo: `${runtimeConfig.public.siteURL}/confirm`
			}
		})
		if (error) {
			throw error
		}
	} catch (error) {
		loggingIn.value = false
		loginError.value = error.message
	}
}

const azureLogin = async () => {
	try {
		loggingIn.value = true
		const { error } = await client.auth.signInWithOAuth({
			provider: 'azure',
			options: {
				scopes: 'email',
				redirectTo: `${runtimeConfig.public.siteURL}/confirm`
			}
		})
		if (error) {
			throw error
		}
	} catch (error) {
		loginError.value = error.message
	}
}

const emailInput = ref()
const passwordInput = ref()
const onSubmit = async () => {
	await emailInput.value.checkHtml5Validity()
	await passwordInput.value.checkHtml5Validity()
}
</script>