import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { 
  TextInput, 
  Button, 
  ActivityIndicator, 
  Text, 
  Card, 
  HelperText 
} from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { firestore } from '../../lib/firebase';
export default function EditCourseScreen() {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  const { courseId } = route.params;

  const [courseData, setCourseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const docSnap = await firestore().collection('courses').doc(courseId).get();
        if (docSnap.exists) {
          setCourseData(docSnap.data());
        } else {
          setMessage(t('editCourse.messages.notFound'));
        }
      } catch (error) {
        console.error(error);
        setMessage(t('editCourse.messages.fetchError'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleChange = (field, value) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await firestore().collection('courses').doc(courseId).update({
        title: courseData.title,
        description: courseData.description,
        price: Number(courseData.price),
        playlistId: courseData.playlistId,
        category: courseData.category,
      });
      setMessage(t('editCourse.messages.success'));
      Alert.alert(t('common.success'), t('editCourse.messages.success'));
      setTimeout(() => navigation.navigate('AdminPage'), 2000);
    } catch (error) {
      console.error(error);
      setMessage(t('editCourse.messages.error'));
      Alert.alert(t('common.error'), t('editCourse.messages.error'));
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating size="large" color="#f97316" />
        <Text style={{ marginTop: 10 }}>{t('common.loading')}</Text>
      </View>
    );
  }

  if (!courseData) {
    return (
      <View style={styles.center}>
        <Text>{message}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Title 
          title={t('editCourse.title')} 
          titleStyle={styles.title} 
        />
        <Card.Content>
          <TextInput
            label={t('editCourse.fields.courseName')}
            value={courseData.title}
            mode="outlined"
            style={styles.input}
            onChangeText={(text) => handleChange('title', text)}
          />

          <TextInput
            label={t('editCourse.fields.playlistId')}
            value={courseData.playlistId}
            mode="outlined"
            style={styles.input}
            onChangeText={(text) => handleChange('playlistId', text)}
          />

          <TextInput
            label={t('editCourse.fields.description')}
            value={courseData.description}
            mode="outlined"
            multiline
            numberOfLines={4}
            style={styles.input}
            onChangeText={(text) => handleChange('description', text)}
          />

          <TextInput
            label={t('editCourse.fields.priceUSD')}
            value={String(courseData.price)}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
            onChangeText={(text) => handleChange('price', text)}
          />

          <Text style={styles.pickerLabel}>{t('editCourse.fields.category')}</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={courseData.category}
              onValueChange={(itemValue) => handleChange('category', itemValue)}
            >
              <Picker.Item label={t('editCourse.category.choose')} value="" />
              <Picker.Item label={t('editCourse.category.programming')} value="Programming" />
              <Picker.Item label={t('editCourse.category.graphicDesign')} value="Graphic Design" />
              <Picker.Item label={t('editCourse.category.socialMedia')} value="Social Media" />
              <Picker.Item label={t('editCourse.category.marketing')} value="Marketing" />
              <Picker.Item label={t('editCourse.category.uiux')} value="Ui/UX" />
            </Picker>
          </View>

          <Button
            mode="contained"
            onPress={handleSubmit}
            disabled={isLoading}
            style={styles.button}
          >
            {isLoading
              ? t('common.savingEllipsis')
              : t('editCourse.buttons.save')}
          </Button>

          {message ? (
            <HelperText type="info" visible={!!message} style={styles.helperText}>
              {message}
            </HelperText>
          ) : null}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  input: {
    marginBottom: 15,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f97316',
    marginTop: 10,
    paddingVertical: 5,
  },
  helperText: {
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
