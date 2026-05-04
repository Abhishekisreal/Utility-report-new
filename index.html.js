function copyReport() {
        const date = new Date().toLocaleDateString('en-GB');
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const sup = document.getElementById('supName').value;
        const shift = document.getElementById('shift').value;
        const inputs = document.querySelectorAll('.val');
        const remarks = document.getElementById('remarks').value;
        const concerns = document.getElementById('concerns').value;
        const argonVal = document.getElementById('argonDays').value;

        let criticalMsg = (argonVal !== "" && argonVal <= 2) ? " ⚠️ *CRITICAL*" : "";

        // Header
        let report = `🏭 *UTILITY SHIFT REPORT*\n━━━━━━━━━━━━━━━━━━━━\n`;
        report += `📅 *Date :* ${date}\n⏰ *Shift :* ${shift}\n👤 *Supervisor :* ${sup}\n\n`;
        
        // Helper function to create a table row
        const row = (id, name, val, unit) => {
            // Pads the name to 15 characters to keep columns aligned
            let paddedName = name.padEnd(16, ' ');
            return ` ${id} | ${paddedName} | ${val || 0} ${unit}\n`;
        };

        report += `*ID | UTILITY          | VALUE*\n`;
        report += `---|------------------|--------\n`;
        
        report += row(1, "GCW Make Up RO", inputs[0].value, "M³");
        report += row(2, "RO Water",       inputs[1].value, "M³");
        report += row(3, "DI Water",       inputs[2].value, "M³");
        report += row(4, "Argon",          inputs[3].value, "M³");
        report += row(5, "CDA",            inputs[4].value, "SCFM");
        report += row(6, "Argon Tank",     inputs[5].value, "Days") + (criticalMsg ? `   ${criticalMsg}\n` : "");
        report += row(7, "General WW",     inputs[6].value, "M³");
        report += row(8, "Acid WW",        inputs[7].value, "M³");
        report += row(9, "Consumption",    inputs[8].value, "kWh");

        report += `━━━━━━━━━━━━━━━━━━━━\n`;
        report += `📝 *REMARKS:*\n${remarks}\n\n`;
        report += `⚠️ *CONCERNS:*\n${concerns}\n\n`;
        report += `━━━━━━━━━━━━━━━━━━━━\n_Reported by: ${sup} | ${time}_`;

        navigator.clipboard.writeText(report).then(() => {
            alert("✅ Tabular report copied!");
        });
    }