import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  OpenAccountSchema,
  OpenAccountSchemaType,
} from "../schemas/openAccountSchema";
import toast from "react-hot-toast";

export const OpenAccountForm = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OpenAccountSchemaType>({
    resolver: zodResolver(OpenAccountSchema),
    defaultValues: {
      fullName: "",
      nationalCode: "",
      phoneNumber: "",
      accountType: "short-term",
      initialDeposit: 0,
      termsAccepted: false,
    },
  });

  const onSubmit = (data: OpenAccountSchemaType) => {
    console.log("📤 ارسال موفق:", data);
    toast.success("فرم با موفقیت ثبت شد ✅");
    reset();
  };

  const selectedAccountType = watch("accountType");
  const deposit = watch("initialDeposit");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rtl text-right max-w-3xl mx-auto bg-white p-8 shadow-xl rounded-2xl border border-gray-200 mt-20 pt-20"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        📄 افتتاح حساب بانکی
      </h2>

      {/* کانتینر گرید */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Full Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            نام و نام خانوادگی
          </label>
          <input
            {...register("fullName")}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.fullName && (
            <p className="text-sm text-red-600 mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* National Code */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">کد ملی</label>
          <input
            {...register("nationalCode")}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.nationalCode && (
            <p className="text-sm text-red-600 mt-1">
              {errors.nationalCode.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            شماره تماس
          </label>
          <input
            {...register("phoneNumber")}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phoneNumber && (
            <p className="text-sm text-red-600 mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* Account Type */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            نوع حساب
          </label>
          <select
            {...register("accountType")}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 rtl text-right"
          >
            <option value="short-term">کوتاه‌مدت</option>
            <option value="long-term">بلندمدت</option>
            <option value="current">جاری</option>
          </select>
        </div>

        {/* Deposit */}
        <div className="md:col-start-2">
          <label className="block mb-1 font-medium text-gray-700">
            مبلغ واریزی اولیه
          </label>
          <input
            type="number"
            {...register("initialDeposit", { valueAsNumber: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right "
          />
          {errors.initialDeposit && (
            <p className="text-sm text-red-600 mt-1">
              {errors.initialDeposit.message}
            </p>
          )}
        </div>

        {/* Terms & Conditions (چون چک‌باکس و label کنار هم هستند، بهتره تک‌ستونه باشه) */}
        <div className="md:col-span-2 flex items-center rtl flex-row-reverse">
          <Controller
            name="termsAccepted"
            control={control}
            render={({ field: { onChange, onBlur, name, ref, value } }) => (
              <input
                type="checkbox"
                name={name}
                onBlur={onBlur}
                onChange={(e) => onChange(e.target.checked)}
                checked={value}
                ref={ref}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            )}
          />
          <label className="ml-2 text-sm text-gray-700">
            شرایط و قوانین را می‌پذیرم
          </label>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-6"
      >
        {isSubmitting ? "در حال ارسال..." : "ثبت فرم"}
      </button>

      {/* Live Watch Data */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-700 border">
        <p>
          <strong>نوع حساب انتخابی:</strong> {selectedAccountType}
        </p>
        <p>
          <strong>مبلغ وارد شده:</strong> {deposit?.toLocaleString("fa-IR")}{" "}
          تومان
        </p>
      </div>
    </form>
  );
};
