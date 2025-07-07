import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import Input from './Input';

const StepOne:React.FC = () => {
  const{
    register,
    trigger,
    reset,
    watch,
    formState: {errors},
  } = useFormContext()

  const watchName = watch("name");
  const watchNationalCode = watch("nationalCode");
  const watchPhone = watch("phone")

  useEffect(()=>{
    console.log("نام تغییر کرد", watchName)
  },[watchName])

  useEffect(()=>{
    console.log("کد ملی تغییر کرد", watchNationalCode)
    if(watchNationalCode && watchNationalCode.lenght === 10){
      trigger("nationalCode");
    }
  },[watchNationalCode, trigger])

  useEffect(()=>{
    console.log("شماره موبایل تغییر کرد", watchPhone)
    if(watchPhone && watchPhone.lenght === 11){
      trigger("phone")
    }
  },[watchPhone, trigger])

  return (
    <div>
      <div>
        <label>نام</label>
        <Input
          {...register("name")}
          placeholder='نام کامل خود را وارد کنید'
        />
        {errors.name &&(
          <p>{errors.name.message as string}</p>
        )}
      </div>
      <div>
        <label>نام خانوادگی</label>
        <Input
          {...register("family")}
          placeholder='نام خانوادگی خود را کامل وارد کنید'
        />
        {errors.family && (
          <p>{errors.family.message as string}</p>
        )}
      </div>
    </div>
  )
}

export default StepOne