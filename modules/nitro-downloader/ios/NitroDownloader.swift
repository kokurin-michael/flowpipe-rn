import Foundation

final class NitroDownloader: HybridNitroDownloaderSpec {
    private enum DownloadError: LocalizedError {
        case invalidURL(String)
        case invalidResponse
        case emptyTempFileURL

        var errorDescription: String? {
            switch self {
            case .invalidURL(let rawURL):
                return "Invalid URL: \(rawURL)"
            case .invalidResponse:
                return "Download failed: invalid HTTP response."
            case .emptyTempFileURL:
                return "Download failed: temporary file URL is missing."
            }
        }
    }

    func download(url: String) throws {
        guard let sourceURL = URL(string: url) else {
            throw DownloadError.invalidURL(url)
        }
        print("[NitroDownloader] Request URL: \(sourceURL.absoluteString)")

        var request = URLRequest(url: sourceURL)
        request.httpMethod = "GET"

        let destinationDirectory = try makeDestinationDirectory()

        let task = URLSession.shared.downloadTask(with: request) { tempFileURL, response, error in
            if let error {
                print("[NitroDownloader] Download error: \(error.localizedDescription)")
                return
            }

            guard let tempFileURL else {
                print("[NitroDownloader] \(DownloadError.emptyTempFileURL.localizedDescription)")
                return
            }

            guard let httpResponse = response as? HTTPURLResponse else {
                print("[NitroDownloader] \(DownloadError.invalidResponse.localizedDescription)")
                return
            }

            guard (200...299).contains(httpResponse.statusCode) else {
                print("[NitroDownloader] Download failed with HTTP status \(httpResponse.statusCode)")
                return
            }

            let fileName = Self.resolveFileName(from: sourceURL, response: httpResponse)
            let destinationURL = destinationDirectory.appendingPathComponent(fileName, isDirectory: false)

            do {
                if FileManager.default.fileExists(atPath: destinationURL.path) {
                    try FileManager.default.removeItem(at: destinationURL)
                }
                try FileManager.default.moveItem(at: tempFileURL, to: destinationURL)
                print("[NitroDownloader] Saved file to: \(destinationURL.path)")
            } catch {
                print("[NitroDownloader] Failed to move file: \(error.localizedDescription)")
            }
        }

        task.resume()
    }

    private func makeDestinationDirectory() throws -> URL {
        let documentsURL = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]

        if !FileManager.default.fileExists(atPath: documentsURL.path) {
            try FileManager.default.createDirectory(
                at: documentsURL,
                withIntermediateDirectories: true
            )
        }

        return documentsURL
    }

    private static func resolveFileName(from sourceURL: URL, response: HTTPURLResponse) -> String {
        if let suggestedName = response.suggestedFilename, !suggestedName.isEmpty {
            return suggestedName
        }

        let lastPathComponent = sourceURL.lastPathComponent.trimmingCharacters(in: .whitespacesAndNewlines)
        if !lastPathComponent.isEmpty {
            return lastPathComponent
        }

        return "download-\(UUID().uuidString)"
    }
}
