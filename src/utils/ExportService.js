import { API_URL } from "./config";

export const ExportService = {
	getFormats: async () => {
		const res = await fetch(`${ API_URL }/exportFormats`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
            },
		});
		const data = await res.json();
        return data.data;
	},
    postExport: async (format, content) => {
        console.log(format);
        console.log(content);
		const response = await fetch(`${ API_URL }/export/${format}`, {
			method: 'POST',
			headers: {
                'Content-Type': 'application/text',            
            },
            body: content,
		});
        if (!response.ok) {
            throw new Error('Failed to export PDF');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement('a');
        a.href = url;
        a.download = format == 'pdf'? 'export_file.pdf':  'export_file.epub';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
	},

}