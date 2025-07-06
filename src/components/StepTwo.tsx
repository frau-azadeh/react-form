import { useFormContext, useWatch } from "react-hook-form";

export const StepTwo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const accountType = useWatch({ name: "accountType" });
  const initialDeposit = useWatch({ name: "initialDeposit" });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* انتخاب نوع حساب */}
      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700">نوع حساب</label>
        <select
          {...register("accountType")}
          className="border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="short-term">کوتاه‌مدت</option>
          <option value="long-term">بلندمدت</option>
          <option value="current">جاری</option>
        </select>
        {errors.accountType && (
          <p className="mt-1 text-sm text-red-600">{errors.accountType.message as string}</p>
        )}
      </div>

      {/* مبلغ واریزی اولیه */}
      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700">مبلغ واریزی اولیه</label>
        <input
          type="number"
          {...register("initialDeposit", { valueAsNumber: true })}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="مثلاً 100000"
        />
        {errors.initialDeposit && (
          <p className="mt-1 text-sm text-red-600">{errors.initialDeposit.message as string}</p>
        )}
      </div>

      {/* نمایش خلاصه اطلاعات */}
      <div className="md:col-span-2 mt-4 bg-gray-50 border border-gray-200 rounded-md p-4 text-gray-700">
        <p>
          <strong>نوع حساب انتخاب شده:</strong>{" "}
          <span className="text-blue-600 capitalize">{accountType.replace("-", " ")}</span>
        </p>
        <p>
          <strong>مبلغ واریزی اولیه:</strong>{" "}
          <span className="text-green-600">
            {initialDeposit ? initialDeposit.toLocaleString("fa-IR") : "0"} تومان
          </span>
        </p>
      </div>
    </div>
  );
};
