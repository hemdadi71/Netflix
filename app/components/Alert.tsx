import React, { Dispatch, SetStateAction } from 'react'
import { FaClosedCaptioning } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'

interface AlertProps {
  setShowAlert: Dispatch<SetStateAction<boolean>>
}

const Alert: React.FC<AlertProps> = ({ setShowAlert }) => {
  const handleCloseAlert = () => {
    setShowAlert(false)
  }
  return (
    <div
      dir="rtl"
      className="fixed -translate-x-1/2 z-50 bg-black text-neutral-200 py-3 px-4 text-center text-xl rounded-md 2xl:bottom-[8%] md:bottom-[1px] right-0 w-[50%]">
      <IoClose
        onClick={handleCloseAlert}
        size={30}
        className="mb-2 hover:text-red-500 cursor-pointer"
      />
      <div className="flex flex-col gap-2">
        <p className="text-green-500">قابل توجه کارفرمایان محترم</p>
        <p>
          برای بازدید از سایت میتونید با هر ایمیلی اکانت بسازید و لاگین کنید و
          نیازی نیست ایمیل حتما در جیمیل ثبت شده باشه فقط باید فرمت درست ایمیل
          و پسورد مناسب قرار بدین
        </p>
      </div>
    </div>
  )
}

export default Alert
