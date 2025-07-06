import { useFormContext, Controller } from "react-hook-form";

export const StepThree = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex items-center justify-start flex-row-reverse gap-2 mt-4">
      <Controller
        name="termsAccepted"
        control={control}
        render={({ field }) => (
          <>
            <input
              id="termsAccepted"
              type="checkbox"
              {...field}
              checked={field.value}
              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 rounded"
            />
            <label htmlFor="termsAccepted" className="select-none cursor-pointer">
              شرایط و قوانین را می‌پذیرم
            </label>
          </>
        )}
      />
      {errors.termsAccepted && (
        <p className="text-red-500 text-sm mt-1">{errors.termsAccepted.message as string}</p>
      )}
    </div>
  );
};
