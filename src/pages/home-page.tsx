import { Link } from "react-router";

const HomePage = () => {
  return (
    <main className="prose prose-lg space-y-6 max-w-none">
      <h1 className="text-4xl font-bold mb-4">MarketTrust</h1>
      <p className="lead">A marketplace with a reputation system (<Link to="https://nlp.stanford.edu/pubs/eigentrust.pdf" className="hover:underline py-1">EigenTrust</Link>) to identify bad actors.</p>

      <p>In traditional reputation systems, users can rate each other, and the overall reputation is sum of these ratings. However, the problem with this approach is that each rating is equally weighted, which can be manipulated by malicious actors. Instead, a user might want to weigh the ratings made by those they trust more highly.</p>

      <p>This notion of transitive trust is the basis of the EigenTrust algorithm: Suppose user A trusts user B, and user B trusts user C. Even though A has never interacted with C, A can still compute a trust score for C by weighing B's trust in C by A's trust in B. Repeating this process, user A can derive a trust score for every other user. For more information, see the <Link to="https://nlp.stanford.edu/pubs/eigentrust.pdf" className="hover:underline py-1">EigenTrust paper</Link>.</p>
    </main>
  );
}

export default HomePage