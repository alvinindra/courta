import ProfileForm from './_components/ProfileForm'

export default function ProfilePage() {
  return (
    <>
      <section className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'>
        <div className='mx-auto grid w-full max-w-md items-start gap-6'>
          <div className='grid gap-6'>
            <ProfileForm />
          </div>
        </div>
      </section>
    </>
  )
}
