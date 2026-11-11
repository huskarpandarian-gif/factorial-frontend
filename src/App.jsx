
import { useState } from 'react';
import { calculateFactorial } from './services/factorialService';

function App() {
    const [number, setNumber] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setResult(null);
        setError('');

        const value = Number(number);

        if (
            number.trim() === '' ||
            !Number.isInteger(value) ||
            value < 0 ||
            value > 20
        ) {
            setError('Ingresa un número entero entre 0 y 20.');
            return;
        }

        try {
            setLoading(true);

            const response = await calculateFactorial(value);

            setResult(response.data);
        } catch (err) {
            const message = err.response?.data?.message;

            setError(message || 'No se pudo conectar con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

                <h1 className="text-3xl font-bold text-slate-900 text-center">
                    Factorial Calculator
                </h1>

                <p className="text-slate-500 text-center mt-2 mb-8">
                    Calcula el factorial de un número.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Introduce un número
                        </label>

                        <input
                            type="number"
                            min="0"
                            max="20"
                            step="1"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            placeholder="Ejemplo: 5"
                            className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold p-3 rounded-lg transition"
                    >
                        {loading ? 'Calculando...' : 'Calcular factorial'}
                    </button>

                </form>

                {error && (
                    <div className="mt-5 bg-red-100 text-red-700 p-3 rounded-lg">
                        {error}
                    </div>
                )}

                {result && (
                    <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-5 text-center">

                        <p className="text-slate-600 text-sm">
                            Resultado de {result.number}!
                        </p>

                        <p className="text-4xl font-bold text-green-700 mt-2">
                            {result.factorial}
                        </p>

                    </div>
                )}

            </div>
        </main>
    );
}

export default App;
