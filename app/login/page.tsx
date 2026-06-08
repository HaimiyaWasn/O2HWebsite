import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <title>Login | O2H Official Site</title>
      <section className="min-h-screen bg-yellow-400">
        <div className="mx-auto flex px-6 min-h-screen max-w-7xl items-center justify-center">
          <div className="grid w-full overflow-hidden rounded-3xl bg-yellow-50 shadow-2xl md:grid-cols-2">
            <div className="flex items-center justify-center p-8 md:p-12">
              <div className="w-full max-w-md text-black">
                <h1 className="text-4xl font-bold">Create an Account</h1>
                <p className="mt-2 opacity-75">
                  SIlahkan login untuk melanjutkan
                </p>
                <form className="mt-8 space-y-8">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Email</label>
                    <input
                      type="email"
                      className="rounded-lg border border-yellow-400 bg-white px-4 py-3 outline-none transition focus:border-yellow-500"
                      placeholder="Masukkan email anda"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Password</label>
                    <input
                      type="password"
                      className="rounded-lg border border-yellow-400 bg-white px-4 py-3 outline-none transition focus:border-yellow-500"
                      placeholder="Masukkan password anda"
                    />
                  </div>
                </form>

                <div className="mt-8 text-center">
                  <p className="opacity-75">
                    Belum punya akun?
                    <Link href="/register">
                      <span className="font-bold text-yellow-500"> Register</span>
                    </Link>
                  </p>
                </div>
                <button type="submit" className="w-full rounded-lg bg-yellow-400 py-3 font-bold transition-all duration-500 hover:bg-yellow-500 active:bg-yellow-500 mt-4">
                  Login
                </button>
              </div>
            </div>

            <div className="hidden md:flex flex-col bg-linear-to-br from-yellow-300 via-yellow-400 to-yellow-500 p-8 text-black">
              <h2 className="font-bold text-3xl">
                O2H Official Site
              </h2>
              <p className="mt-1 opacity-80">
                Temukan koleksi favoritmu disini!!!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
