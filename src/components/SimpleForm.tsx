// src/components/AdvancedForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { formSchema, FormSchemaType } from '../schemas/formSchema';

export const SimpleForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormSchemaType) => {
    toast.success('Form submitted successfully!');
    console.log('Form Data:', data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-6"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">User Registration Form</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            {...register('name')}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            {...register('email')}
            type="email"
            className="w-full border px-4 py-2 rounded"
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Phone</label>
          <input
            {...register('phone')}
            className="w-full border px-4 py-2 rounded"
            placeholder="e.g. 09123456789"
          />
          {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Postal Code</label>
          <input
            {...register('postalCode')}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.postalCode && <p className="text-sm text-red-600">{errors.postalCode.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Age</label>
          <input
            {...register('age', { valueAsNumber: true })}
            type="number"
            className="w-full border px-4 py-2 rounded"
          />
          {errors.age && <p className="text-sm text-red-600">{errors.age.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Gender</label>
          <select {...register('gender')} className="w-full border px-4 py-2 rounded">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="text-sm text-red-600">{errors.gender.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Resume (PDF Only)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setValue('resume', e.target.files?.[0] as File)}
            className="w-full"
          />
          {errors.resume && <p className="text-sm text-red-600">{errors.resume.message}</p>}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input type="checkbox" {...register('acceptTerms')} />
        <label>I accept the terms and conditions</label>
      </div>
      {errors.acceptTerms && <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
};
