import React, { useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { formSchema, FormSchemaType } from "../schemas/formSchema";

type Skill = {
  name: string;
  rating: number;
};

type FormInputs = Omit<FormSchemaType, "skills"> & {
  skills: Record<string, number>;
};

// فرض بر اینه که acceptTerms توی FormSchemaType به صورت boolean تعریف شده یا باید تغییر بدی
// اگر acceptTerms فقط true باشه، مقدار false پیش‌فرض اشتباهه و باید نوع رو اصلاح کنی

const StarRating: React.FC<{
  value: number;
  onChange: (value: number) => void;
  max?: number;
}> = ({ value, onChange, max = 5 }) => {
  return (
    <div className="flex space-x-1">
      {Array.from({ length: max }, (_, i) => (
        <button
          key={i}
          type="button"
          className={`text-2xl ${
            i < value ? "text-yellow-400" : "text-gray-300"
          } focus:outline-none`}
          onClick={() => onChange(i + 1)}
          aria-label={`${i + 1} Star`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const SimpleForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      family: "",
      email: "",
      phone: "",
      postalCode: "",
      age: undefined,
      gender: "male",
      resume: undefined,
      acceptTerms: false, // این باید با نوع acceptTerms توی schema هماهنگ باشه (boolean بهتره)
      bio: "",
      skills: {},
      jobStatus: "employed",
      dob: undefined,
    },
  });

  // استفاده از watch برای مشاهده مقدار acceptTerms (مثال)
  const acceptTermsValue = watch("acceptTerms");
  useEffect(() => {
    console.log("Accept Terms changed:", acceptTermsValue);
  }, [acceptTermsValue]);

  const [newSkillName, setNewSkillName] = useState("");
  const [skillsList, setSkillsList] = useState<Skill[]>([]);

  const addSkill = (): void => {
    const trimmedName = newSkillName.trim().toLowerCase();
    if (!trimmedName) {
      toast.error("Please enter a skill name");
      return;
    }
    if (skillsList.find((s) => s.name === trimmedName)) {
      toast.error("This skill is already added");
      return;
    }
    setSkillsList([...skillsList, { name: trimmedName, rating: 0 }]);
    setNewSkillName("");
  };

  const updateSkillRating = (name: string, rating: number): void => {
    setSkillsList((prev) =>
      prev.map((skill) => (skill.name === name ? { ...skill, rating } : skill)),
    );
  };

  // تایپ صحیح تابع onSubmit
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const skillsObj: Record<string, number> = {};
    skillsList.forEach((skill) => {
      skillsObj[skill.name] = skill.rating;
    });

    const finalData: FormInputs = {
      ...data,
      skills: skillsObj,
    };

    toast.success("Form submitted successfully!");
    console.log("Form Data:", finalData);

    reset();
    setSkillsList([]);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow space-y-6  mt-32"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 ">
        User Registration Form
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            {...register("name")}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Family */}
        <div>
          <label className="block font-medium mb-1">Family</label>
          <input
            {...register("family")}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.family && (
            <p className="text-sm text-red-600">{errors.family.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium mb-1">Phone</label>
          <input
            {...register("phone")}
            placeholder="e.g 09123456789"
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.phone && (
            <p className="text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        {/* Postal Code */}
        <div>
          <label className="block font-medium mb-1">Postal Code</label>
          <input
            {...register("postalCode")}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.postalCode && (
            <p className="text-sm text-red-600">{errors.postalCode.message}</p>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="block font-medium mb-1">Age</label>
          <input
            type="number"
            {...register("age", { valueAsNumber: true })}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.age && (
            <p className="text-sm text-red-600">{errors.age.message}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block font-medium mb-1">Gender</label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            )}
          />
          {errors.gender && (
            <p className="text-sm text-red-600">{errors.gender.message}</p>
          )}
        </div>

        {/* Resume */}
        <div className="col-span-2">
          <label className="block font-medium mb-1">Resume (PDF Only)</label>
          <Controller
            name="resume"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  field.onChange(file);
                }}
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            )}
          />
          {errors.resume && (
            <p className="text-sm text-red-600">{errors.resume.message}</p>
          )}
        </div>

        {/* Accept Terms */}
        <div className="col-span-2 flex items-center space-x-2">
          <input
            type="checkbox"
            {...register("acceptTerms")}
            id="acceptTerms"
            className="h-4 w-4"
          />
          <label htmlFor="acceptTerms" className="text-sm font-medium">
            I accept the terms and conditions
          </label>
        </div>
        {errors.acceptTerms && (
          <p className="text-sm text-red-600 col-span-2">
            {errors.acceptTerms.message}
          </p>
        )}

        {/* Bio */}
        <div className="col-span-2">
          <label className="block font-medium mb-1">Bio</label>
          <textarea
            {...register("bio")}
            rows={3}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.bio && (
            <p className="text-sm text-red-600">{errors.bio.message}</p>
          )}
        </div>

        {/* Skills Dynamic */}
        <div className="col-span-2">
          <label className="block font-medium mb-1">Add Skill</label>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="Type skill name and click Add"
              className="flex-grow border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add
            </button>
          </div>

          {skillsList.length === 0 && (
            <p className="text-gray-500">No skills added yet.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {skillsList.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center justify-between border rounded px-4 py-2"
              >
                <span className="capitalize font-semibold">{skill.name}</span>
                <StarRating
                  value={skill.rating}
                  onChange={(val) => updateSkillRating(skill.name, val)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Job Status */}
        <div>
          <label className="block font-medium mb-1">Job Status</label>
          <Controller
            name="jobStatus"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="">Select status</option>
                <option value="employed">Employed</option>
                <option value="student">Student</option>
                <option value="freelancer">Freelancer</option>
                <option value="unemployed">Unemployed</option>
              </select>
            )}
          />
          {errors.jobStatus && (
            <p className="text-sm text-red-600">{errors.jobStatus.message}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block font-medium mb-1">Date of Birth</label>
          <Controller
            name="dob"
            control={control}
            render={({ field }) => (
              <input
                type="date"
                value={
                  field.value ? field.value.toISOString().split("T")[0] : ""
                }
                onChange={(e) => {
                  const val = e.target.value;
                  field.onChange(val ? new Date(val) : undefined);
                }}
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            )}
          />
          {errors.dob && (
            <p className="text-sm text-red-600">{errors.dob.message}</p>
          )}
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          type="submit"
          disabled={Object.keys(errors).length > 0}
          className="px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SimpleForm;
