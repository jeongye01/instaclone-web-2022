interface IForm{
email:String;
password:String;
}
const {register,handleSubmit,getValues,setValue}=useForm<IForm>();
return (

  <form onSubmit={handleSubmit(onValid)}>
    <input ref={register({required:true})} name="email" type="email"/>

    <input ref={register} name="password"/>

  </form>
);
