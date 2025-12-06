import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl rounded-2xl p-12 shadow-2xl">
        <h1 className="text-5xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
          Pokedex Lite
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="group bg-linear-to-br from-blue-500 to-purple-600 p-6 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl border-4 border-white/20"
            >
              <div className="w-20 h-20 bg-white/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">#{i}</span>
              </div>
              <h3 className="text-white font-semibold text-xl text-center group-hover:translate-y-1 transition-transform">
                Pokemon {i}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
