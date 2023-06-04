export default {
  list: { placeholder: { restaurant: 'Select Restaurant' }, title: 'Activity Status' },
  view: {
    title: 'My Profile',
    button: 'Check my activites',
    progress: 'Activity Progress',
    label: { city: 'City', country: 'Country' }
  },
  edit: {
    title: 'Edit my profile',
    button: 'Save',
    label: {
      firstName: 'First Name*',
      lastName: 'Last Name*',
      email: 'Email id*',
      phone: 'Phone',
      city: 'City',
      country: 'Country'
    },
    error: {
      firstName: 'First name is required',
      lastName: 'Last Name is required',
      email: 'Email id is required',
      fileSize: 'Uploaded image size should be less than 2Mb'
    }
  }
};
