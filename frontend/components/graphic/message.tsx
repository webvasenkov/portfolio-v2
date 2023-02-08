import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSendMessageMutation } from 'features/portfolio/portfolioApi';
import { IMessagePayload } from 'app/types';
import Notification from 'components/notification';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import * as yup from 'yup';
import { useAnimationInView, useAppDispatch } from 'app/hooks';
import { setMessageInView } from 'features/general/generalSlice';
import { motion } from 'framer-motion';
import { showVariants } from 'app/animations';

type InputErrorProps = {
  errorMessage: string | undefined;
};

const schema = yup.object().shape({
  email: yup.string().required().email(),
  name: yup.string().required(),
  text: yup.string().required('message is a required field'),
});

function InputError({ errorMessage }: InputErrorProps) {
  return (
    <p className='absolute text-red-500 font-light max-w-full right-0 bottom-0 translate-y-full'>
      {errorMessage}
      <span className='text-red'>*</span>
    </p>
  );
}

function Message() {
  const dispatch = useAppDispatch();
  const [isSent, setIsSent] = useState(false);
  const [sendMessage, { isLoading, isSuccess }] = useSendMessageMutation();
  const { ref, inView, controls } = useAnimationInView();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setIsSent(true);
    }
  }, [isLoading, isSuccess]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IMessagePayload>({
    resolver: yupResolver(schema),
  });

  function onSubmit(messagePayload: IMessagePayload) {
    sendMessage(messagePayload);
    reset();
    setIsSent(false);
  }

  useEffect(() => {
    dispatch(setMessageInView(inView));
  }, [inView]);

  return (
    <motion.div
      className='flex py-16 flex-col xl:flex-row gap-16 xl:gap-32 justify-between items-center'
      variants={showVariants}
      initial='hidden'
      animate={controls}
      id='message'
      ref={ref}>
      <h2 className='text-3xl xl:text-7xl font-bold w-[100%] text-center xl:text-left xl:w-[30%]'>
        Say Hi
      </h2>
      <form
        className='w-[100%] xl:w-[70%] flex flex-wrap gap-8'
        onSubmit={handleSubmit(onSubmit)}>
        <div className='relative w-[100%] xl:w-[calc(50%-2rem)]'>
          <label htmlFor='email' />
          <input
            className='w-full px-6 py-4 border border-dark-gray/60 dark:border-none rounded-md bg-white/80 text-[#202020] font-light placeholder:text-white placeholder:font-light placeholder:text-[#202020]/60 outline-none focus:bg-white transition'
            {...register('email')}
            id='email'
            type='text'
            placeholder='Email'
          />
          {errors.email && <InputError errorMessage={errors.email.message} />}
        </div>
        <div className='relative w-[100%] xl:w-[50%]'>
          <label htmlFor='name' />
          <input
            className='w-full px-6 py-4 border border-dark-gray/60 dark:border-none rounded-md bg-white/80 text-[#202020] font-light placeholder:text-white placeholder:font-light placeholder:text-[#202020]/60 outline-none focus:bg-white transition'
            {...register('name')}
            name='name'
            id='name'
            type='text'
            placeholder='Name'
          />
          {errors.name && <InputError errorMessage={errors.name.message} />}
        </div>
        <div className='relative w-full h-48 xl:h-96'>
          <label htmlFor='text' />
          <textarea
            className='w-full h-full px-6 py-4 border border-dark-gray/60 dark:border-none rounded-md bg-white/80 text-[#202020] font-light placeholder:text-white placeholder:font-light placeholder:text-[#202020]/60 outline-none resize-none focus:bg-white transition'
            {...register('text')}
            name='text'
            id='text'
            placeholder='Message'
          />
          {errors.text && <InputError errorMessage={errors.text.message} />}
        </div>
        <button className='text-white ml-auto bg-gradient-to-r from-blue to-red px-6 py-4 rounded-md animate-gradient bg-[length:200%_200%] hover:opacity-90 transition'>
          Send message
        </button>
      </form>
      {isSent && (
        <Notification message='The message has been sent' reset={isSent} />
      )}
    </motion.div>
  );
}

export default Message;
