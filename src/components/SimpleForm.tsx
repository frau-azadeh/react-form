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
const SimpleForm:React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      name: "",
      family: "",
      email: "",
      phone: "",
      postalCode: "",
      age: undefined,
      gender: "male",
      resume: undefined,
      acceptTerms: false,
      bio: "",
      skills: {},
      jobStatus: "employed",
      dob: undefined,
    }
  })

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
   >
    <h2>User Registeration Form</h2>
    <div>
      <div>
        <label>Name</label>
        <input
          {...register("name")}
        />
        {errors.name && (
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
          type="email"
        />
        {errors.email &&(
          <p>{errors.email.message}</p>
        )}
      </div>
      <div>
        <label>Phone</label>
        <input
          {...register("phone")}
          placeholder="e.g 09123456789"
        />
        {errors.phone && (
          <p>{errors.phone.message}</p>
        )}
      </div>
      <div>
        <label>Postal Code</label>
        <input
          {...register("postalCode")}
        />
        {errors.postalCode && (
          <p>{errors.postalCode.message}</p>
        )}
      </div>
      <div>
        <label>Age</label>
        <input
          {...register("age",{valueAsNumber: true})}
        />
        {errors.age &&(
          <p>{errors.age.message}</p>
        )}
      </div>
      <div>
        <label>Gender</label>
        <Controller
          name="gender"
          control={control}
          render={({field})=>(
            <select
              {...field}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          )}
        />
        {errors.gender && (
          <p>{errors.gender.message}</p>
        )}
      </div>

      <div>
        <label>Resume</label>
        <Controller
          name="resume"
          control={control}
          render={({field})=>(
            <input type="file"
              accept="application/pdf"
              onChange={(e)=>{
                const file = e.target.files?.[0];
                field.onChange(file);
              }}
            />
          )}
        />
        {errors.resume &&(
          <p>{errors.resume.message}</p>
        )}
      </div>
      <div>
        <input
          type="checkbox"
          {...register("acceptTerms")}
          id="acceptTerms"
        />
        <label htmlFor="acceptTerms">I accept the terms and conditions</label>
      </div>
      {errors.acceptTerms &&(
        <p>{errors.acceptTerms.message}</p>
      )}
    </div>

   </form>
  )
}

export default SimpleForm