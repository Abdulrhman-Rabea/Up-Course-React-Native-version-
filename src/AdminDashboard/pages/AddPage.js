import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, HelperText, Menu, Provider } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../lib/supabaseClient';
import { db } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

function AddCoursePage() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const user = getAuth().currentUser;

  const [title, setTitle] = useState('');
  const [playlistId, setPlaylistId] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [category, setCategory] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(t('permissionDenied'), t('pleaseGrantGalleryAccess'));
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!title || !playlistId || !description || !price || !imageUri) {
      setMessage(t('addCourse.messages.fillRequired'));
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {


      const response = await fetch(imageUri);
      const blob = await response.blob();
      const filePath = `public/${Date.now()}-course-image.jpg`;

      const { error: uploadError } = await supabase.storage.from('images').upload(filePath, blob);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath);


      await addDoc(collection(db, 'courses'), {
        ownerUid: user.uid,
        ownerEmail: user.email ?? null,
        title,
        playlistId,
        description,
        price: Number(price),
        imageUrl: publicUrl,
        createdAt: new Date(),
        category,
      });

      setMessage(t('addCourse.messages.success'));
      setIsLoading(false);
      setTimeout(() => navigation.navigate('AdminPage'), 2000);
    } catch (error) {
      setMessage(`${t('addCourse.messages.error')}: ${error.message}`);
      setIsLoading(false);
    }
  };

  return (
    <Provider>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>{t('addCourse.title')}</Text>

        <TextInput
          label={t('addCourse.fields.courseTitle')}
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label={t('addCourse.fields.playlistId')}
          value={playlistId}
          onChangeText={setPlaylistId}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label={t('addCourse.fields.description')}
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          multiline
          numberOfLines={4}
          mode="outlined"
        />

        <TextInput
          label={t('addCourse.fields.priceUSD')}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={styles.input}
          mode="outlined"
        />

        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setMenuVisible(true)}
              style={[styles.input, { justifyContent: 'flex-start' }]}
            >
              {category || t('addCourse.category.choose')}
            </Button>
          }
        >
          {['Programming', 'Graphic Design', 'Social Media', 'Marketing', 'Ui/UX'].map(cat => (
            <Menu.Item
              key={cat}
              onPress={() => {
                setCategory(cat);
                setMenuVisible(false);
              }}
              title={t(`addCourse.category.${cat.replace(/ /g, '').toLowerCase()}`)}
            />
          ))}
        </Menu>

        <Button
          mode="contained"
          onPress={pickImage}
          style={styles.imageButton}
        >
          {imageUri ? t('addCourse.fields.changeCoverImage') : t('addCourse.fields.coverImage')}
        </Button>

        {imageUri && (
          <Text style={styles.imageUriText}>{imageUri}</Text>
        )}

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
          style={styles.submitButton}
        >
          {isLoading ? t('addCourse.buttons.saving') : t('addCourse.buttons.submit')}
        </Button>

        {message ? (
          <Text style={[styles.message, message.includes(t('addCourse.messages.errorWord')) ? styles.errorText : styles.successText]}>
            {message}
          </Text>
        ) : null}
      </ScrollView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  imageButton: {
    marginVertical: 16,
  },
  imageUriText: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#555',
  },
  submitButton: {
    marginTop: 16,
  },
  message: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
  },
  successText: {
    color: 'green',
  },
});

export default AddCoursePage;
