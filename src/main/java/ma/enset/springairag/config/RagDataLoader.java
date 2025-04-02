package ma.enset.springairag.config;


import org.springframework.ai.document.Document;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.vectorstore.SimpleVectorStore;
import org.springframework.ai.reader.pdf.PagePdfDocumentReader;
import org.springframework.ai.transformer.splitter.TextSplitter;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.File;
import java.nio.file.Path;
import java.util.List;

@Component
public class RagDataLoader {
    @Value("classpath:/pdfs/cv.pdf")
    private Resource pdfResource;
    // for ollama
//    @Value("store-data-v1.json")
//    private String storefile1;
    // for openai
    @Value("store-data-v2.json")
    private String storefile2;

    @Bean
    public SimpleVectorStore simpleVectorStore(EmbeddingModel embeddingModel){
        SimpleVectorStore simpleVectorStore = SimpleVectorStore.builder(embeddingModel).build();
        String fileStore = Path.of("src", "main", "resources", "store").toAbsolutePath()+"/"+storefile2;
        File file = new File(fileStore);
        if(!file.exists()) {
            PagePdfDocumentReader pagePdfDocumentReader = new PagePdfDocumentReader(pdfResource);
            List<Document> documents = pagePdfDocumentReader.get();
            TextSplitter textSplitter = new TokenTextSplitter();
            List<Document> chunks = textSplitter.split(documents);
            simpleVectorStore.accept(chunks);
            simpleVectorStore.save(file);
        }else{
            simpleVectorStore.load(file);
        }
        return simpleVectorStore;
    }
}
