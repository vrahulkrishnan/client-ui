export default {
  login: {
    title: 'Login',
    register: `Don't have an account?`,
    signUp: 'Sign up',
    label: {
      email: 'Email*',
      password: 'Password*'
    },
    errors: {
      email: 'Invalid Email address',
      password: 'Password is required'
    },
    button: {
      login: `Let's go`,
      forgot: 'Forgot Password'
    }
  },
  forgotPassword: {
    title: 'Forgot Password',
    register: `Don't have an account?`,
    signUp: 'Sign up',
    successfull: `Your password reset email should arrive shortly. If you don't see it, please check your spam folder, sometimes it can end up there!`,
    description: `If you've forgotten your password, please submit your email below to get a reset link.`,
    label: {
      email: 'Email*'
    },
    errors: {
      email: 'Invalid Email address'
    },
    button: {
      reset: 'Reset Password'
    }
  },
  reset: {
    title: 'Reset Password',
    passwordRequirement: 'Includes at least 6 characters',
    label: {
      password: 'Password*',
      confirmPassword: 'Confirm Password*'
    },
    errors: {
      password: 'Password is required',
      confirmPassword: 'Password doesnt match'
    },
    button: {
      reset: 'Reset Password'
    }
  },
  verification: {
    title: 'Verification email sent',
    description:
      'An email with a verification link has been sent to your email address. Please click on the link to verify your email and continue the registration process.',
    alreadySent:
      'An email with a verification link already sent to your email address. Please click on the link to verify your email and continue the registration process.'
  },
  register: {
    title: 'Register',
    description: 'Register for Client to discover #50Things',
    login: 'Already have an Account?',
    privacy: 'Privacy',
    terms: 'Terms',
    label: {
      firstName: 'First Name*',
      lastName: 'Last Name*',
      email: 'Email*',
      phone: 'Phone*',
      password: 'Password*',
      confirmPassword: 'Confirm Password*',
      checkbox: 'By clicking Sign Up, you agree to our',
      passwordRequirement: 'Includes at least 6 characters'
    },
    errors: {
      firstName: 'First name is required',
      lastName: 'Last name is required',
      email: 'Invalid Email address',
      phone: 'Phone number is required',
      password: 'Password is required',
      confirmPassword: 'Password doesnt match',
      checkbox: 'Please check the consent box'
    },
    button: {
      register: 'Register',
      login: 'Login'
    }
  }
};
