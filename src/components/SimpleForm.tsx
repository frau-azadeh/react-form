// src/components/AdvancedForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { formSchema, FormSchemaType } from "../schemas/formSchema";

const SimpleForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = (data: FormSchemaType)=>{
    toast.success("Form submitted successfully!");
    console.log("Form Data: ", data)
    reset();
  }
  return (
<form onSubmit={handleSubmit(onSubmit)}>
  <h2>User Registration Form: </h2>
  <div>
    <div>
      <label>Name</label>
      <input
        {...register("name")}
      />
      {errors.name &&(
        <p>{errors.name.message}</p>
      )}
    </div>

    <div>
      <label>Family</label>
      <input
        {...register("family")}
      />
      {errors.family &&(
        <p>{errors.family.message}</p>
      )}
    </div>

    <div>
      <label>Email</label>
      <input
        {...register("email")}
        type='email'
      />
      {errors.email && (
        <p>{errors.email.message}</p>
      )}
    </div>

    <div>
      <label>Phone</label>
      <input
        {...register("phone")}
        placeholder='e.g 09123456789'
      />
      {errors.phone &&(
        <p>{errors.phone.message}</p>
      )}
    </div>

    <div>
      <label>Postal Code</label>
      <input
        {...register("postalCode")}
      />
      {errors.postalCode &&(
        <p>{errors.postalCode.message}</p>
      )}
    </div>

    <div>
      <label>Age</label>
      <input
        {...register("age", { valueAsNumber: true})}
        type='number'
      />
      {errors.age &&(
        <p>{errors.age.message}</p>
      )}
    </div>

    <div>
      <label>Gender</label>
      <select 
        {...register("gender")}
      >
        <option value="">Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      {errors.gender &&(
        <p>{errors.gender.message}</p>
      )}
    </div>
    <div>
      <label>Resume (PDF Only)</label>
      <input
        type='file'
        accept='application/pdf'
        onChange={(e)=>setValue("resume", e.target.files?.[0] as File)}
      />
      {errors.resume &&(
        <p>{errors.resume.message}</p>
      )}
    </div>
  </div>

  <div>
    <input type='checkbox' {...register("acceptTerms")}/>
    <label>I accept the terms and conditions</label>
  </div>
  {errors.acceptTerms &&(
    <p>{errors.acceptTerms.message}</p>
  )}

  <button
    type='submit'
  >
    Submit
  </button>
</form>
  )
}

export default SimpleForm