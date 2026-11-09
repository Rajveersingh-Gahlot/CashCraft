import "./SummaryCards.css";

function SummaryCards() {
  const summaryData = [
    {
      title: "Total Balance",
      amount: "₹30,000.00",
      description: "Available balance",
      icon: "₹",
      type: "balance",
    },
    {
      title: "Total Income",
      amount: "₹50,000.00",
      description: "Total money received",
      icon: "↗",
      type: "income",
    },
    {
      title: "Total Expenses",
      amount: "₹20,000.00",
      description: "Total money spent",
      icon: "↘",
      type: "expense",
    },
  ];
  return (
    <div className="summary-cards">
      {summaryData.map((item) => (
        <div className={`summary-card ${item.type}`} key={item.type}>
          <div className="summary-card-top">
            <span className="summary-card-title">{item.title}</span>

            <div className="summary-card-icon">{item.icon}</div>
          </div>

          <h3 className="summary-card-amount">{item.amount}</h3>

          <p className="summary-card-description">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;
