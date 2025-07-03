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
    </div>

   </form>
  )
}

export default SimpleForm