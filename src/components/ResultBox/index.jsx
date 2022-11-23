import "./styles.css";

const Box = ({ title, result, type }) => {
    return (
        <div className="box">
            <span>{title}</span>
            <p className={type}>{result}</p>
        </div>
    );
}

export default function ResultBox({ result, isLoaded }) {

    return (
        isLoaded && (
            <div className="result-box">
                <h2>Resultado</h2>
                <div className="results">
                    <Box title="Valor total bruto" result={`R$${result.grossTotal.toFixed(2)}`} type="grossTotal" />
                    <Box title="Valor investido" result={`R$${result.invested}`} type="invested" />
                    <Box title="Valor em juros" result={`R$${result.interestAmount.toFixed(2)}`} type="interestAmount" />
                    <Box title="Imposto de renda sobre rentabilidade" result={`R$${result.tax * 100}%`} />
                    <Box title="Valor pago em imposto de renda" result={`R$${result.incomeTax.toFixed(2)}`} />
                    <Box title="Valor total líquido" result={`R$${result.liquidAmount.toFixed(2)}`} type="liquidAmount" />
                </div>
            </div>
        )
    );
}