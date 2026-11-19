import json, random, math, os

random.seed(42)

all_questions = []

OPTIONS_KEYS = ['A', 'B', 'C', 'D', 'E']

def make_question(qid, category, sub_category, diff, q_text, correct_ans, distractors, explanation, trap, speed_hack, key_index):
    target_key = OPTIONS_KEYS[key_index % 5]
    other_keys = [k for k in OPTIONS_KEYS if k != target_key]
    opts = {target_key: correct_ans}
    for i, d in enumerate(distractors[:4]):
        opts[other_keys[i]] = d
    
    full_explanation = f"{explanation}\n\nKunci Jawaban yang Tepat: {target_key} ({correct_ans})."
    
    return {
        "id": qid,
        "category": category,
        "subCategory": sub_category,
        "difficulty": diff,
        "question": q_text,
        "options": opts,
        "correctOption": target_key,
        "explanation": full_explanation,
        "trapAnalysis": trap,
        "speedHack": speed_hack
    }

def make_tkp(qid, sub_category, q_text, scored_options, explanation, trap, speed_hack, rot):
    # scored_options is list of 5 (text, score)
    rotated = scored_options[rot % 5:] + scored_options[:rot % 5]
    opts = {}
    scores = {}
    best_key = 'A'
    for i, (text, sc) in enumerate(rotated):
        k = OPTIONS_KEYS[i]
        opts[k] = text
        scores[k] = sc
        if sc == 5:
            best_key = k
            
    full_explanation = f"{explanation}\n\nOpsi Terbaik (Skor 5): {best_key}."
    return {
        "id": qid,
        "category": "TKP",
        "subCategory": sub_category,
        "difficulty": "HOTS / Hard",
        "question": q_text,
        "options": opts,
        "optionScores": scores,
        "optionsScores": scores,
        "correctOption": best_key,
        "explanation": full_explanation,
        "trapAnalysis": trap,
        "speedHack": speed_hack
    }

print("Base helper loaded.")
