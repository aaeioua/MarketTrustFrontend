const HomePage = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return (
    <div className="prose">
      <p>{token ? "You are signed in." : "Please sign in or register."}</p>
    </div>
  );
}

export default HomePage