import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

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
        <label className="mb-2 font-semibold text-gray-700">نام و نام خانوادگی</label>
        <input
          {...register("fullName")}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="نام کامل خود را وارد کنید"
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName.message as string}</p>
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
          <p className="mt-1 text-sm text-red-600">{errors.nationalCode.message as string}</p>
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
          <p className="mt-1 text-sm text-red-600">{errors.phone.message as string}</p>
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
          <p className="mt-1 text-sm text-red-600">{errors.email.message as string}</p>
        )}
      </div>

      {/* دکمه‌ها در زیر فرم، تمام عرض در موبایل، کنار هم در دسکتاپ */}
      <div className="md:col-span-2 flex flex-col md:flex-row justify-between gap-4 mt-6">
        <button
          type="button"
          onClick={() => reset()}
          className="bg-yellow-400 hover:bg-yellow-500 transition-colors text-white font-semibold py-2 rounded-md"
        >
          ریست فرم
        </button>
        <button
          type="button"
          onClick={async () => {
            const isValid = await trigger(["fullName", "nationalCode", "phone", "email"]);
            console.log("🧪 اعتبارسنجی دستی:", isValid);
          }}
          className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors font-semibold py-2 rounded-md"
        >
          بررسی اعتبار
        </button>
      </div>
    </div>
  );
};
