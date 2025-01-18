import React from "react";
import "../App.css";

// alexandria.tsx
export default function AlexandriaData() {
  return [
    {
      id: 20,
      title: "Zero-Shot Text-to-Image Generation hi my name",
      year: "2024",
      tag: ["#transformer", "#detector"],
      subject: "T2I generation: DALL-E (feat.multi-modal)",
      user: {
        id: 1,
        name: "김희재",
      },
      link: "https://www.github.com/1026hz",
      content: `## Introduction

- 하나의 이미지는 많은 경험을 함께 묶을 수 있음
    - 예를 들어 해변의 이미지는 파도 소리, 모래의 질감, 바람, 심지어 시를 떠올리게 할 수 있음
- 이 논문에서는 여러 유형의 이미지 쌍 데이터 를 활용하여 공통된 공유 space를 학습하는 IMAGEBIND를 소개
- 6가지 modality (Image, Text, Audio, Depth, Thermal, IMU) 를 활용
- 모든 modality가 존재하는 데이터셋은 필요하지 않음
    
    → 이미지의 binding 속성을 활용하여 각 modality의 enbedding을 이미지 embedding에 맞추어 정렬
    
    - 실제로 (text, image), (audio, image), (depth, image) 등의 데이터만 학습하여도 (audio, text) 데이터셋을 학습하지 않고 audio로 부터 text를 얻을 수 있는 zero-shot recognition이 가능
- 따라서 IMAGEBIND는 적은 훈련으로도 다양한 modality와 task에 적용할 수 있음`,
    },
    {
      id: 19,
      title: "Zero-Shot Text-to-Image Generation hi my name",
      year: "2024",
      tag: ["#transformer", "#detector"],
      subject: "T2I generation: DALL-E (feat.multi-modal)",
      user: {
        id: 1,
        name: "맹의현",
      },
      link: "https://www.github.com/maeng99",
      content: `ㅎㅇㅎ`,
    },
    {
      id: 18,
      title: "Iero-Shot Text-to-Image Generation hi my name",
      year: "2025",
      tag: ["#transformer", "#detector"],
      subject: "T2I generation: DALL-E (feat.multi-modal)",
      user: {
        id: 1,
        name: "김재관",
      },
      link: "https://www.github.com/KJaeKwan",
      content: `## Method

- 목표는 이미지를 사용하여 모든 modality를 결합한 하나의 공동(joint) embedding 공간을 학습하는 것

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/1a79b12c-25cc-4e93-94ab-a7f6f769a665/5673c2fd-9ab9-4d24-9918-f32b3720c14d/image.png)

### 1. Preliminaries

- **Aligning specific pairs of modalities** - Contrastive Learning은 modality들의 통합 embedding space를 학습하는 가장 대표적인 방법
    - modality 쌍을 정렬할 수는 있지만, 동일한 modality 쌍만 trian과 evaluate가능
- **Zero-shot image classification using text prompts** - 각 클래스 사진에 대해 정말 다양한 문장을 대응시켜 학습시켜 한번도 보지 못한 대상에 대해 알게 하는 방법 (CLIP이 대표적)
    - 다른 modality에 대해서 적용하려면 쌍을 이루는 텍스트 데이터를 구체적으로 훈련시켜야만 함

### 2.  Binding modalities with images

- 모든 학습은 이미지를 기준으로 이미지(I)와 또다른 modality(M)가 쌍을 이루는 (I, M)을 사용하여 단일 공통 embedding을 학습
- 다른 modality들을 image의 embedding space에 정렬시키는 과정을 거치는데 infoNCE loss로 optimiazation을 수행
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/1a79b12c-25cc-4e93-94ab-a7f6f769a665/25f6556e-7121-4e44-aa56-75df063138af/image.png)
    
    - $I_i$ : 주어진 이미지
    - $M_i$ : 다른 modality
    - $f, g$ : deep network
    - $q_i$ : f(Ii)로 얻은 normalized embedding
    - $k_i$ : g(Mi)로 얻은 normalized embedding
    - $\tau$는 softmax distribution의 smothness를 제어
    
    → 위 과정을 통해서 q와 k가 joint embedding 공간상  가까워지도록 학습
    
- 실제로는 symmetric한 loss를 사용
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/1a79b12c-25cc-4e93-94ab-a7f6f769a665/655fc648-dd7c-4b30-a677-dc31a6ef378c/image.png)
    
    - $L_{I, M}$에는 서로 다른 이미지를 멀어지게 하는 부분이 생략되었고
    - $L_{M,I}$에는 서로 다른 modality가 멀어지게 하는 부분이 생략되었기 때문
- **Emergent alignment of unseen pairs of modalities** - IMAGEBIND에서는 굳이 다른 학습이 필요 없고, 이미지를 매개로 ($I, M_1$)과 ($I, M_2$)만 학습하여도 두가지 ($M_1, M_2$)를 정렬하는 embedding 공간을 얻을 수 있음

### 3. Implementation Details`,
    },
    {
      id: 17,
      title: "Pero-Shot Text-to-Image Generation hi my name",
      year: "2023",
      tag: ["#transformer", "#detector"],
      subject: "T2I generation: DALL-E (feat.multi-modal)",
      user: {
        id: 1,
        name: "신은빈",
      },
      link: "https://www.instagram.com/eu_n._.b",
      content: "안녕하세요",
    },
    {
      id: 16,
      title: "Lero-Shot Text-to-Image Generation hi my name",
      year: "2022",
      tag: ["#transformer", "#detector"],
      subject: "T2I generation: DALL-E (feat.multi-modal)",
      user: {
        id: 1,
        name: "김정찬",
      },
      link: "https://www.instagram.com/hwru_chan",
      content: "안녕하세요",
    },
    {
      id: 15,
      title: "Oero-Shot Text-to-Image Generation hi my name",
      year: "2020",
      tag: ["#transformer", "#detector"],
      subject: "T2I generation: DALL-E (feat.multi-modal)",
      user: {
        id: 1,
        name: "맹의현",
      },
      link: "https://www.youtube.com/",
      content: `## Experiments

- **Naturally paired modalities and datasets**
    - IMAGEBIND는 6가지 modality에 사용
    - 기존 데이터셋을 이용(Audioset, SUN RGB-D 등…)
- **Large scale image-text pairs**
    - OpenCLIP의 pre-trained vision(ViT-H 630M params) 및 text encoder(302M params) 사용한 대규모 pre-trained model을 활용
- **Encoders for each modality**
    - 오디오를 2D mel-spectrogram으로, 열 및 깊이를 1-channel 이미지로 변환하여 ViT를 적용
- **Emergent zero-shot vs. zero-shot**
    - 보통 zero-shot은 같은 modality 내에서 training할 때 없던 class를 예측하는 것을 말함
        - ex. (image. text)로 이루어진 데이터를 학습해 training에 없었던 text로 분류가 가능한지 test
    - 하지만 본 논문에서는 training에 없었던 \`modality pair\` 에 대해 zero-shot이 가능한지 test함
        - ex. (image, text)와 (image, audio)를 학습했을때, (text, audio) 분류가 가능한지 test
        
        ⇒ 이를 “Emergent zero-shot”이라고 부름
        
- **Evaluation on downstream tasks** - 다양한 프로토콜로 다양한 다운스트림 작업에서 종합적으로 평가
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/1a79b12c-25cc-4e93-94ab-a7f6f769a665/0ded3724-fbbb-43b5-9e54-0d7bcf857bd7/image.png)
    

### 1. Emergent zero-shot classification

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/1a79b12c-25cc-4e93-94ab-a7f6f769a665/295cdaa2-b400-4d7c-9281-b78ca2fc4f69/image.png)

- 주제의 참신함을 고려하였을때, IMAGEBIND를 비교할 공정한  기준이 없음
    - 하지만 text와 특정 modality를 결합한 이전 연구와 비교를 수행
- 각 benchmark들의 SOTA와 비교하여 성능이 좋지 않지만 준수한 편
    - 또한, image가 아닌 다른 modality와 text embedding이 나름 잘 호환되는 것을 확인할 수 있음

### 2. Comparison to prior work

- **Zero-shot text to audio retrieval and classification**
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/1a79b12c-25cc-4e93-94ab-a7f6f769a665/a5bad267-1e85-4050-88ac-61f59b2247c1/image.png)
    
    - 이전 연구들은 IMAGEBIND와 달리 해당 modality에 대해서 페어링된 데이터를 사용하여 훈련했다는 점을 고려
    - 그럼에도 각 benchmark에서 이전 연구에 비해 뛰어난 성능을 보임
- **Text to audio and video retrieval**
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/1a79b12c-25cc-4e93-94ab-a7f6f769a665/dbd98012-f049-4dfd-8302-1234940ff740/image.png)
    
    - audio만 사용했을 때에도 우수한 성능을 보임
    - Table2에서 text to vedio의 성능이 우수한 걸 확인할 수 있는데, audio를 함께 결합하면 성능을 더 올릴 수 있음

### 3. Few-shot classification

- IMAGEBIND의 label 효율성을 평가하기 위해 few-shot classification을 수행
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/1a79b12c-25cc-4e93-94ab-a7f6f769a665/77d634ce-4ceb-4940-b199-0fdafb69f6ed/image.png)
    
- **few-shot audio classification**
    - self-supervised AudioMAE보다 정확도가 40% 향상
    - supervised AudioMAE와 비슷한 성능
- Few-shot depth classification
    - images, depth, semantic segmentation data로 학습한 multimodal MultiMAE와 비교하여 뛰어난 성능

### 4. **Analysis and Applications**

- **Multimodal embedding space arithmetic**
    - 서로 다른 modality를 합쳐 새로운 input으로 활용
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/1a79b12c-25cc-4e93-94ab-a7f6f769a665/ea97a0c8-d32c-4cc7-8bf0-c72d6f34890b/image.png)
    
- **Upgrading text-based detectors to audio-based**
    - 아무런 training없이 audio를 입력했을 때 해당하는 object를 detect 및 segment`,
    },
    {
      id: 14,
      title: "Zero-Shot Text-to-Image Generation hi my name",
      year: "2024",
      tag: ["#transformer", "#detector"],
      subject: "T2I generation: DALL-E (feat.multi-modal)",
      user: {
        id: 1,
        name: "김희재",
      },
      link: "https://www.github.com/1026hz",
      content: "안녕하세요",
    },
    {
      id: 13,
      title: "Zero-Shot Text-to-Image Generation hi my name",
      year: "2024",
      tag: ["#transformer", "#detector"],
      subject: "T2I generation: DALL-E (feat.multi-modal)",
      user: {
        id: 1,
        name: "맹의현",
      },
      link: "https://www.github.com/maeng99",
      content: "안녕하세요",
    },
    {
      id: 12,
      title: "Iero-Shot Text-to-Image Generation hi my name",
      year: "2025",
      tag: ["#transformer", "#detector"],
      subject: "T2I generation: DALL-E (feat.multi-modal)",
      user: {
        id: 1,
        name: "김재관",
      },
      link: "https://www.github.com/KJaeKwan",
      content: "안녕하세요",
    },
    {
      id: 11,
      title: "Pero-Shot Text-to-Image Generation hi my name",
      year: "2023",
      tag: ["#transformer", "#detector"],
      subject: "T2I generation: DALL-E (feat.multi-modal)",
      user: {
        id: 1,
        name: "김재관",
      },
      link: "https://www.youtube.com/",
      content: "안녕하세요",
    },
    {
      id: 10,
      title: "Lero-Shot Text-to-Image Generation hi my name",
      year: "2022",
      tag: ["#transformer", "#detector"],
      subject: "T2I generation: DALL-E (feat.multi-modal)",
      user: {
        id: 1,
        name: "윤현수",
      },
      link: "https://www.youtube.com/",
      content: "안녕하세요",
    },
    {
      id: 9,
      title: "Oero-Shot Text-to-Image Generation hi my name",
      year: "2020",
      tag: ["#transformer", "#detector"],
      subject: "T2I generation: DALL-E (feat.multi-modal)",
      user: {
        id: 1,
        name: "맹의현",
      },
      link: "https://www.youtube.com/",
      content: "안녕하세요",
    },
  ];
}
