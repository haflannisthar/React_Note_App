export const RegistrationFromControls=[
    {
        label: 'Name',
        name:'name',
        placeholder:'Enter your name',
        type:'text',
        componentType:'input',
        pattern : /^[A-Z][a-z]{2,}$/

}
,
{
    label: 'Email',
    name:'email',
    placeholder:'Enter your email',
    type:'email',
    componentType:'input',
    pattern : /^[A-Z][a-z]{2,}$/

},
{
    label: 'Password',
    name:'password',
    placeholder:'Enter your password',
    type:'password',
    componentType:'input',
    pattern : /^[A-Z][a-z]{2,}$/

}

]


export const LoginFormControls=[
    {
        label: 'Email',
        name:'email',
        placeholder:'Enter your email',
        type:'email',
        componentType:'input'
    },
    {
        label: 'Password',
        name:'password',
        placeholder:'Enter your password',
        type:'password',
        componentType:'input'
    }
]