import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  OpenAccountSchema,
  OpenAccountSchemaType,
} from "../schemas/openAccountSchema";
import { successToast, errorToast } from "../utils/toast";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";

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

  const onSubmit = async (data: OpenAccountSchemaType) => {
    try {
      console.log("📤 ارسال موفق:", data);
      successToast("فرم با موفقیت ثبت شد ✅");
      reset(); // بعد از موفقیت فرم ریست میشه
    } catch (err) {
      errorToast("خطایی رخ داده است ❌");
    }
  };

  // نمایش اطلاعات زنده برای آموزش
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* نام */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            نام و نام خانوادگی
          </label>
          <Input {...register("fullName")} aria-invalid={!!errors.fullName} />
          {errors.fullName && (
            <p className="text-sm text-red-600 mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* کد ملی */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">کد ملی</label>
          <Input {...register("nationalCode")} />
          {errors.nationalCode && (
            <p className="text-sm text-red-600 mt-1">
              {errors.nationalCode.message}
            </p>
          )}
        </div>

        {/* شماره تماس */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            شماره تماس
          </label>
          <Input {...register("phoneNumber")} />
          {errors.phoneNumber && (
            <p className="text-sm text-red-600 mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* نوع حساب */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            نوع حساب
          </label>
          <Controller
            name="accountType"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  { label: "کوتاه‌مدت", value: "short-term" },
                  { label: "بلندمدت", value: "long-term" },
                  { label: "جاری", value: "current" },
                ]}
                error={errors.accountType}
              />
            )}
          />
        </div>

        {/* واریزی اولیه */}
        <div className="md:col-start-1">
          <label className="block mb-1 font-medium text-gray-700">
            مبلغ واریزی اولیه
          </label>
          <Input
            type="number"
            {...register("initialDeposit", { valueAsNumber: true })}
          />
          {errors.initialDeposit && (
            <p className="text-sm text-red-600 mt-1">
              {errors.initialDeposit.message}
            </p>
          )}
        </div>

        {/* پذیرش شرایط */}
        <div className="md:col-span-2 flex items-center">
          <Controller
            name="termsAccepted"
            control={control}
            render={({ field: { onChange, onBlur, name, ref, value } }) => (
              <Input
                type="checkbox"
                name={name}
                onBlur={onBlur}
                onChange={(e) => onChange(e.target.checked)}
                checked={value}
                ref={ref}
              />
            )}
          />
          <label className="ml-2 text-sm text-gray-700">
            شرایط و قوانین را می‌پذیرم
          </label>
          {errors.termsAccepted && (
            <p className="text-sm text-red-600 ml-4">
              {errors.termsAccepted.message}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-6"
      >
        {isSubmitting ? "در حال ارسال..." : "ثبت فرم"}
      </Button>

      {/* نمایش مقدار زنده */}
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
