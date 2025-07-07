import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import Button from "./Button";

export const StepOne = () => {
  const {
    register,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useFormContext();

  const watchFullName = watch("fullName");
  const watchNationalCode = watch("nationalCode");

  useEffect(() => {
    console.log("نام تغییر کرد:", watchFullName);
  }, [watchFullName]);

  useEffect(() => {
    console.log("کد ملی تغییر کرد:", watchNationalCode);

    if (watchNationalCode && watchNationalCode.length === 10) {
      trigger("nationalCode");
    }
  }, [watchNationalCode, trigger]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* نام و نام خانوادگی */}
      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700">نام</label>
        <input
          {...register("name")}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="نام کامل خود را وارد کنید"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">
            {errors.name.message as string}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700">نام خانوادگی</label>
        <input
          {...register("family")}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="نام خانوادگی خود را کامل وارد کنید"
        />
        {errors.family && (
          <p className="mt-1 text-sm text-red-600">
            {errors.family.message as string}
          </p>
        )}
      </div>
      {/* کد ملی */}
      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700">کد ملی</label>
        <input
          {...register("nationalCode")}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="کد ملی ۱۰ رقمی"
        />
        {errors.nationalCode && (
          <p className="mt-1 text-sm text-red-600">
            {errors.nationalCode.message as string}
          </p>
        )}
      </div>

      {/* شماره موبایل */}
      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700">شماره موبایل</label>
        <input
          {...register("phone")}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="مثلاً 09123456789"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">
            {errors.phone.message as string}
          </p>
        )}
      </div>

      {/* ایمیل */}
      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700">ایمیل</label>
        <input
          type="email"
          {...register("email")}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="example@mail.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">
            {errors.email.message as string}
          </p>
        )}
      </div>

      {/* دکمه‌ها در زیر فرم، تمام عرض در موبایل، کنار هم در دسکتاپ */}
      <div className="md:col-span-2 flex flex-col md:flex-row justify-between gap-4 mt-6">
        <Button type="button" onClick={() => reset()} variant="secondary">
          ریست فرم
        </Button>
        <Button
          type="button"
          onClick={async () => {
            const isValid = await trigger([
              "fullName",
              "nationalCode",
              "phone",
              "email",
            ]);
            console.log("🧪 اعتبارسنجی دستی:", isValid);
          }}
          variant="outline"
        >
          بررسی اعتبار
        </Button>
      </div>
    </div>
  );
};

