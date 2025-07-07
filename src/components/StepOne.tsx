import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";

const StepOne: React.FC = () => {
  const {
    register,
    trigger,
    reset,
    watch,
    formState: { errors },
  } = useFormContext();

  const watchName = watch("name");
  const watchNationalCode = watch("nationalCode");
  const watchPhone = watch("phone");

  useEffect(() => {
    console.log("نام تغییر کرد", watchName);
  }, [watchName]);

  useEffect(() => {
    console.log("کد ملی تغییر کرد", watchNationalCode);
    if (watchNationalCode && watchNationalCode.lenght === 10) {
      trigger("nationalCode");
    }
  }, [watchNationalCode, trigger]);

  useEffect(() => {
    console.log("شماره موبایل تغییر کرد", watchPhone);
    if (watchPhone && watchPhone.lenght === 11) {
      trigger("phone");
    }
  }, [watchPhone, trigger]);

  return (
    <div className="grid md:grid-cols-2 gap-10 m-5 grid-cols-1">
      <div className="flex flex-col">
        <label className="mb-3 text-gray-600">نام</label>
        <Input {...register("name")} placeholder="نام کامل خود را وارد کنید" />
        {errors.name && (
          <p className="mt-1 text-sm text-red-700">
            {errors.name.message as string}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label className="mb-3 text-gray-600">نام خانوادگی</label>
        <Input
          {...register("family")}
          placeholder="نام خانوادگی خود را کامل وارد کنید"
        />
        {errors.family && (
          <p className="mt-1 text-sm text-red-700">
            {errors.family.message as string}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label className="mb-3 text-gray-600">کد ملی</label>
        <Input {...register("nationalCode")} placeholder="کد ملی 10 رقمی" />
        {errors.nationalCode && (
          <p className="mt-1 text-sm text-red-700">
            {errors.nationalCode.message as string}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label className="mb-3 text-gray-600">شماره موبایل</label>
        <Input {...register("phone")} placeholder="09123456789" />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-700">
            {errors.phone.message as string}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label className="mb-3 text-gray-600">ایمیل</label>
        <Input
          type="email"
          {...register("email")}
          placeholder="example@mail.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-700">
            {errors.email.message as string}
          </p>
        )}
      </div>
      <div className="md:col-span-2 flex flex-col md:flex-row justify-between">
        <Button onClick={() => reset()} variant="secondary">
          ریست فرم
        </Button>
        <Button
          variant="outline"
          onClick={async () => {
            const isValid = await trigger([
              "name",
              "nationalCode",
              "phone",
              "email",
            ]);
            console.log("اعتبار سنجی", isValid);
          }}
        >
          بررسی اعتبار
        </Button>
      </div>
    </div>
  );
};

export default StepOne;
